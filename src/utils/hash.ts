/**
 * FNV-1a hash 算法实现
 * @param str 要哈希的字符串
 * @param asString 是否返回16进制字符串
 * @param seed 可选的种子值
 * @returns 返回数字或8位16进制字符串
 */
function fnv1a(
    str: string,
    asString: boolean = false,
    seed: number = 0x811c9dc5
): string | number {
    let hash = seed;

    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        // 使用位运算优化乘法运算
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }

    // 确保结果是32位无符号整数
    hash = hash >>> 0;

    if (asString) {
        // 转换为8位16进制字符串，补零对齐
        return hash.toString(16).padStart(8, '0');
    }

    return hash;
}

// 封装成更易用的工具类
export default class HashUtil {
    /**
     * 生成字符串的 FNV-1a hash
     * @param text 输入文本
     * @param options 配置选项
     */
    static fnv1a(text: any, options: {
        asString?: boolean;
        seed?: number;
    } = {}) {
        if (typeof text !== 'string') {
            text = JSON.stringify(text);
        }
        const { asString = true, seed } = options;
        return fnv1a(text, asString, seed);
    }

    /**
     * 生成多个字符串的组合 hash
     * @param strings 字符串数组
     */
    static combinedHash(strings: string[]): string {
        let hash = 0x811c9dc5;

        for (const str of strings) {
            hash ^= Number(fnv1a(str));
            hash = hash >>> 0; // 保持32位
        }

        return hash.toString(16).padStart(8, '0');
    }
}