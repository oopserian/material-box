const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)
const path = require('path')
const fs = require('fs')

async function convertWithHybridMethod(pptPath, outputDir) {
  // 基础参数处理
  const baseName = path.basename(pptPath, path.extname(pptPath))
  const tempDir = path.join(outputDir, 'temp_export')
  
  // 1. 创建临时目录
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true })
  }

  // 2. 构造AppleScript
  const script = `
  tell application "Microsoft PowerPoint"
    activate
    set pptFile to POSIX file "${pptPath}" as alias
    set outputFolder to POSIX file "${tempDir}" as alias
    
    -- 打开文件并获取总页数
    open pptFile
    set thePres to active presentation
    set slideCount to count of slides of thePres
    
    -- 逐页导出
    repeat with i from 1 to slideCount
      set outputFile to (POSIX path of outputFolder) & "${baseName}_" & i & ".png"
      export slide i of thePres to outputFile as save as PNG with export format PNG format
      delay 1 -- 防止过快操作导致崩溃
    end repeat
    
    close thePres saving no
    quit
  end tell
  `

  // 3. 执行AppleScript
  try {
    console.log('开始转换...')
    const { stdout, stderr } = await execPromise(`osascript -e '${script}'`)
    
    // 4. 验证结果
    const files = fs.readdirSync(tempDir)
      .filter(f => f.endsWith('.png'))
      .map(f => {
        const newPath = path.join(outputDir, f)
        fs.renameSync(path.join(tempDir, f), newPath)
        return newPath
      })

    fs.rmdirSync(tempDir, { recursive: true })

    if (files.length === 0) {
      throw new Error('转换失败：未生成任何文件')
    }

    return files
  } catch (error) {
    // 清理临时目录
    if (fs.existsSync(tempDir)) {
      fs.rmdirSync(tempDir, { recursive: true })
    }
    throw error
  }
}

// 使用示例
(async () => {
  try {
    const result = await convertWithHybridMethod(
      'test.pptx',
      'output'
    )
    console.log('转换成功:', result)
  } catch (error) {
    console.error('转换失败:', error.message)
  }
})()