# PPT 转 PNG 工具

这个工具可以将PowerPoint演示文稿（PPT/PPTX）转换为高质量PNG图片，使用PowerPoint原生COM接口保证最佳转换质量，支持Windows、macOS和Linux平台。

## 功能特点

- 支持多个平台（Windows、macOS、Linux）
- 将PPT中的所有幻灯片转换为单独的PNG图片
- 仅使用PowerPoint原生接口进行转换，确保最高质量输出
- 保留所有字体和图形元素
- 简单易用的命令行界面

## 转换方法

本工具专注于使用PowerPoint原生接口进行高质量转换，在不同平台上的实现方式如下：

### Windows
- 使用PowerPoint COM对象直接控制PowerPoint应用程序

### macOS
- 使用JavaScript for Automation (JXA)或AppleScript控制PowerPoint for Mac

### Linux
- 通过Wine运行Windows版PowerPoint (需要额外配置)

## 依赖项

### Windows
- Microsoft PowerPoint（必需）

### macOS
- Microsoft PowerPoint for Mac（必需）

### Linux
- Wine（用于运行Windows版PowerPoint）
- Windows版Microsoft PowerPoint（通过Wine安装）

## 安装

1. 确保已安装Node.js环境
2. 下载`ppt2png.js`脚本
3. 确保已安装Microsoft PowerPoint（在macOS上为PowerPoint for Mac）

## 使用方法

```bash
node ppt2png.js <ppt文件路径> [输出目录]
```

### 参数说明

- `<ppt文件路径>`: 要转换的PPT/PPTX文件的路径（必须）
- `[输出目录]`: 输出PNG图片的目录（可选，默认为原文件所在目录下的output文件夹）

### 示例

```bash
# 转换PPT文件，输出到默认目录
node ppt2png.js presentation.pptx

# 转换PPT文件，指定输出目录
node ppt2png.js presentation.pptx ./images
```

## 输出结果

- 脚本会生成PPT中每一张幻灯片的PNG图片
- 输出文件格式：`slide-1.png`, `slide-2.png`, `slide-3.png`...
- 所有图片保留原始PPT中的所有元素（字体、图形、动画最终状态等）

## 注意事项

- 该工具需要Microsoft PowerPoint才能工作
- 转换过程中可能会短暂显示PowerPoint界面
- 在Linux上，需要通过Wine配置PowerPoint环境

## 故障排除

如果遇到转换失败，请检查：

1. 确认PPT文件是否存在且格式正确
2. 确认Microsoft PowerPoint已正确安装
3. 确认输出目录有写入权限
4. 在Linux上，确认Wine和PowerPoint配置正确

## 高级用户

高级用户可以修改脚本中的分辨率设置：

- Windows: 修改`$slide.Export($outputPath, "PNG", 1024, 768)`中的分辨率参数
- macOS: 可调整JXA/AppleScript中的导出设置 