import url from "url";
import path from "path";

interface FileURL {
    href: string;
}

/**
 * 将文件路径转换为 URL
 * @param filePath - 文件路径
 * @returns URL 对象或空字符串（如果转换失败）
 */
export function pathToFileURL(filePath: string): FileURL | null {
    if (!filePath) {
        return null;
    }

    try {
        // macOS 系统直接使用 url.pathToFileURL
        if (process.platform === 'darwin') {
            return url.pathToFileURL(filePath);
        }

        // Windows 和其他系统的处理
        const normalizedPath = path.normalize(filePath);
        
        // 处理 UNC 路径 (以 \\ 开头的网络共享路径)
        if (normalizedPath.startsWith('\\\\')) {
            const fileURL = url.pathToFileURL(normalizedPath);
            return {
                href: `file://${fileURL.hostname}${fileURL.pathname}`
            };
        }

        return url.pathToFileURL(normalizedPath);
    } catch (error) {
        console.error('Error converting path to URL:', error);
        return null;
    }
}

/**
 * 将文件 URL 转换为路径
 * @param fileURL - 文件 URL 字符串
 * @returns 文件路径或空字符串（如果转换失败）
 */
export function fileURLToPath(fileURL: string): string {
    if (!fileURL) {
        return "";
    }

    try {
        return url.fileURLToPath(fileURL);
    } catch (error) {
        console.error('Error converting URL to path:', error);
        return "";
    }
}

/**
 * 验证文件 URL 格式是否正确
 * @param fileURL - 要验证的文件 URL
 * @returns 是否是有效的文件 URL
 */
export function isValidFileURL(fileURL: string): boolean {
    try {
        const parsed = new URL(fileURL);
        return parsed.protocol === 'file:';
    } catch {
        return false;
    }
}

/**
 * 规范化文件路径
 * @param filePath - 要规范化的文件路径
 * @returns 规范化后的路径
 */
export function normalizePath(filePath: string): string {
    if (!filePath) {
        return "";
    }
    return path.normalize(filePath);
}

// 导出所有工具函数
export default {
    pathToFileURL,
    fileURLToPath,
    isValidFileURL,
    normalizePath
};