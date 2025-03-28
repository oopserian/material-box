import { pathToFileURL } from "@utils/url";
import fs from "fs";

interface CompressOptions {
    input: string;          // 源文件路径
    dest: string;           // 目标文件路径
    format?: string;        // 输出格式
    quality?: number;       // 压缩质量
    maxSize?: number;       // 最大尺寸
}

interface ImageDimensions {
    width: number;
    height: number;
}

const DEFAULT_OPTIONS = {
    format: 'image/jpeg',
    quality: 0.8,
    maxSize: 320
};

const WEBP_MAX_SIZE = 16383;

/**
 * 计算图片缩放尺寸
 */
function calculateDimensions(
    originalWidth: number,
    originalHeight: number,
    maxSize: number
): ImageDimensions {
    if (Math.max(originalWidth, originalHeight) <= maxSize) {
        return { width: originalWidth, height: originalHeight };
    }

    const aspectRatio = originalWidth / originalHeight;
    return originalWidth > originalHeight
        ? {
            width: maxSize * aspectRatio,
            height: maxSize
        }
        : {
            width: maxSize,
            height: maxSize / aspectRatio
        };
}

/**
 * 创建并配置画布
 */
function setupCanvas(img: HTMLImageElement, dimensions: ImageDimensions): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }

    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    return canvas;
}

/**
 * 确定输出格式和质量
 */
function determineOutputFormat(
    canvas: HTMLCanvasElement,
    format?: string,
    quality?: number
): { format: string; quality: number } {
    let outputFormat = format || DEFAULT_OPTIONS.format;
    let outputQuality = quality || DEFAULT_OPTIONS.quality;

    // WebP 格式限制检查
    if (canvas.width > WEBP_MAX_SIZE || canvas.height > WEBP_MAX_SIZE) {
        outputFormat = 'image/jpeg';
        outputQuality = 0.7;
    }

    return { format: outputFormat, quality: outputQuality };
}

/**
 * 压缩图片
 */
async function compress(options: CompressOptions): Promise<ImageDimensions | true> {
    const { input, dest, format, quality, maxSize = DEFAULT_OPTIONS.maxSize } = options;

    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = async () => {
            try {
                // 计算尺寸
                const dimensions = calculateDimensions(img.width, img.height, maxSize);

                // 设置画布
                const canvas = setupCanvas(img, dimensions);

                // 确定输出格式
                const output = determineOutputFormat(canvas, format, quality);

                // 转换为 base64
                const base64 = canvas.toDataURL(output.format, output.quality);

                // 解码并保存
                const decoded = decodeBase64Image(base64);
                if (!decoded?.data) {
                    return resolve(true);
                }

                await fs.promises.writeFile(dest, decoded.data);
                resolve({
                    width: img.width,
                    height: img.height
                });

            } catch (error) {
                console.error('Image compression failed:', error);
                resolve(true);
            }
        };

        img.onerror = (error) => {
            console.error('Image loading failed:', error);
            reject(new Error('Failed to load image'));
        };

        // 添加时间戳防止缓存
        const imageUrl = `${pathToFileURL(input).href}?v=${Date.now()}`;
        img.src = imageUrl;
    });
}

/**
 * Base64 解码工具函数
 */
function decodeBase64Image(base64String: string) {
    try {
        const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string');
        }

        return {
            type: matches[1],
            data: Buffer.from(matches[2], 'base64')
        };
    } catch (error) {
        console.error('Base64 decoding failed:', error);
        return null;
    }
}

export default compress;