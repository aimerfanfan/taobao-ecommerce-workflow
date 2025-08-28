/**
 * 淘宝电商工作流助手 - 主脚本
 * 负责协调产品抓取、图片生成和文件管理模块
 */

// 全局配置对象
const AppConfig = {
    // 默认设置
    defaults: {
        savePath: "D:/淘宝产品素材",
        fileNaming: "productid",
        templates: {
            main: "template1",
            spec: "template1",
            detail: "template1"
        }
    },
    
    // 当前处理的产品信息
    currentProduct: null,
    
    // 生成的图片资源
    generatedImages: {
        main: [],
        spec: [],
        detail: []
    },
    
    // 应用状态
    state: {
        isProcessing: false,
        currentStep: null, // 'crawl', 'generate', 'save'
        errors: []
    }
};

// 初始化应用
function initApp() {
    // 加载保存的配置
    loadSavedConfig();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 检查依赖
    checkDependencies();
    
    console.log("淘宝电商工作流助手已初始化");
}

// 加载保存的配置
function loadSavedConfig() {
    try {
        const savedConfig = localStorage.getItem('taobaoHelperConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            // 更新界面
            document.getElementById('save-path').value = config.savePath || AppConfig.defaults.savePath;
            document.getElementById('file-naming').value = config.fileNaming || AppConfig.defaults.fileNaming;
            document.getElementById('main-image-template').value = config.templates?.main || AppConfig.defaults.templates.main;
            document.getElementById('spec-image-template').value = config.templates?.spec || AppConfig.defaults.templates.spec;
            document.getElementById('detail-image-template').value = config.templates?.detail || AppConfig.defaults.templates.detail;
            
            console.log("已加载保存的配置");
        } else {
            // 设置默认值
            document.getElementById('save-path').value = AppConfig.defaults.savePath;
        }
    } catch (error) {
        console.error("加载配置时出错:", error);
    }
}

// 保存当前配置
function saveCurrentConfig() {
    try {
        const config = {
            savePath: document.getElementById('save-path').value,
            fileNaming: document.getElementById('file-naming').value,
            templates: {
                main: document.getElementById('main-image-template').value,
                spec: document.getElementById('spec-image-template').value,
                detail: document.getElementById('detail-image-template').value
            }
        };
        
        localStorage.setItem('taobaoHelperConfig', JSON.stringify(config));
        console.log("配置已保存");
    } catch (error) {
        console.error("保存配置时出错:", error);
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 开始处理按钮
    document.getElementById('start-btn').addEventListener('click', startProcess);
    
    // 浏览文件夹按钮
    document.getElementById('browse-btn').addEventListener('click', browseFolder);
    
    // 打开文件夹按钮
    document.getElementById('open-folder-btn').addEventListener('click', openResultFolder);
    
    // 导出到网盘按钮
    document.getElementById('export-btn').addEventListener('click', exportToCloudDrive);
    
    // 批量下载按钮
    document.getElementById('download-all-btn').addEventListener('click', downloadAllImages);
    
    // 配置变更时保存
    document.getElementById('save-path').addEventListener('change', saveCurrentConfig);
    document.getElementById('file-naming').addEventListener('change', saveCurrentConfig);
    document.getElementById('main-image-template').addEventListener('change', saveCurrentConfig);
    document.getElementById('spec-image-template').addEventListener('change', saveCurrentConfig);
    document.getElementById('detail-image-template').addEventListener('change', saveCurrentConfig);
}

// 检查依赖
function checkDependencies() {
    // 在实际应用中，这里可以检查网络连接、API访问权限等
    console.log("依赖检查完成");
    return true;
}

// 开始处理流程
async function startProcess() {
    const productUrl = document.getElementById('product-url').value;
    if (!productUrl) {
        showModal('错误', '请输入有效的产品链接');
        return;
    }
    
    // 检查是否已有正在进行的处理
    if (AppConfig.state.isProcessing) {
        showModal('提示', '已有处理任务正在进行中，请等待完成');
        return;
    }
    
    // 更新应用状态
    AppConfig.state.isProcessing = true;
    AppConfig.state.currentStep = 'crawl';
    AppConfig.state.errors = [];
    
    // 显示进度区域
    document.getElementById('progress-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    
    try {
        // 1. 抓取产品信息
        updateProgress('crawl-progress', 'crawl-percentage', 10);
        const productInfo = await TaobaoCrawler.crawlProductInfo(productUrl);
        updateProgress('crawl-progress', 'crawl-percentage', 100);
        
        // 保存产品信息
        AppConfig.currentProduct = productInfo;
        console.log("产品信息抓取完成:", productInfo);
        
        // 2. 生成图片
        AppConfig.state.currentStep = 'generate';
        updateProgress('generate-progress', 'generate-percentage', 10);
        
        // 根据选择的模板和配置生成图片
        const imageOptions = {
            generateMain: document.getElementById('main-image').checked,
            generateSpec: document.getElementById('spec-image').checked,
            generateDetail: document.getElementById('detail-image').checked,
            templates: {
                main: document.getElementById('main-image-template').value,
                spec: document.getElementById('spec-image-template').value,
                detail: document.getElementById('detail-image-template').value
            }
        };
        
        const generatedImages = await ImageGenerator.generateImages(productInfo, imageOptions);
        updateProgress('generate-progress', 'generate-percentage', 100);
        
        // 保存生成的图片信息
        AppConfig.generatedImages = generatedImages;
        console.log("图片生成完成:", generatedImages);
        
        // 3. 保存文件
        AppConfig.state.currentStep = 'save';
        updateProgress('save-progress', 'save-percentage', 10);
        
        const saveOptions = {
            path: document.getElementById('save-path').value,
            namingRule: document.getElementById('file-naming').value,
            createSubfolders: true
        };
        
        const saveResult = await FileManager.saveImages(generatedImages, productInfo, saveOptions);
        updateProgress('save-progress', 'save-percentage', 100);
        console.log("文件保存完成:", saveResult);
        
        // 4. 显示结果
        displayResults(generatedImages, saveResult);
        
        // 显示完成提示，包含下载说明
        const totalImages = generatedImages.main.length + generatedImages.spec.length + generatedImages.detail.length;
        showModal('处理完成', `产品信息已抓取，共生成${totalImages}张图片。图片已自动下载到您的浏览器下载文件夹中。如果没有自动下载，请点击"下载全部图片"按钮。`);
        
    } catch (error) {
        console.error("处理过程中出错:", error);
        AppConfig.state.errors.push(error.message);
        showModal('错误', `处理过程中出错: ${error.message}`);
    } finally {
        // 重置应用状态
        AppConfig.state.isProcessing = false;
        AppConfig.state.currentStep = null;
    }
}

// 更新进度条
function updateProgress(progressBarId, percentageId, percentage) {
    const progressBar = document.getElementById(progressBarId);
    const percentageElement = document.getElementById(percentageId);
    
    progressBar.style.width = percentage + '%';
    percentageElement.textContent = Math.round(percentage) + '%';
}

// 显示处理结果
function displayResults(images, saveResult) {
    // 显示结果区域
    document.getElementById('result-container').classList.remove('hidden');
    
    // 更新数量统计
    document.getElementById('main-image-count').textContent = images.main.length;
    document.getElementById('spec-image-count').textContent = images.spec.length;
    document.getElementById('detail-image-count').textContent = images.detail.length;
    
    // 在实际应用中，这里可以添加图片预览功能
    // 例如：document.getElementById('main-image-preview').innerHTML = `<img src="${images.main[0].previewUrl}" class="h-full w-full object-contain">`;
}

// 浏览文件夹
function browseFolder() {
    // 在Web应用中，这通常需要系统级权限
    // 这里简化为弹出对话框让用户输入
    const path = prompt("请输入保存路径:", document.getElementById('save-path').value);
    if (path) {
        document.getElementById('save-path').value = path;
        saveCurrentConfig();
    }
}

// 打开结果文件夹
function openResultFolder() {
    const path = document.getElementById('save-path').value;
    if (!path) {
        showModal('错误', '未设置保存路径');
        return;
    }
    
    // 在Web应用中，这通常需要系统级权限
    // 这里简化为显示路径
    showModal('文件夹位置', `您的文件已保存在: ${path}`);
    
    // 在实际应用中，可以尝试使用系统API打开文件夹
    // 例如：window.open('file:///' + path.replace(/\\/g, '/'));
}

// 导出到网盘
function exportToCloudDrive() {
    // 这里可以实现与各种网盘API的集成
    // 简化为显示提示信息
    showModal('导出到网盘', '此功能需要配置网盘API，请在设置中完成配置。');
}

// 批量下载所有图片
async function downloadAllImages() {
    if (!AppConfig.generatedImages || !AppConfig.currentProduct) {
        showModal('提示', '请先处理产品并生成图片后再下载。');
        return;
    }
    
    try {
        showModal('下载中', '正在准备下载文件，请稍候...');
        
        // 使用文件管理器的批量下载功能
        await FileManager.downloadAllAsZip(AppConfig.generatedImages, AppConfig.currentProduct);
        
        // 关闭提示框
        document.getElementById('modal').classList.add('hidden');
        
        // 显示成功提示
        setTimeout(() => {
            showModal('下载完成', '所有图片已打包下载到您的浏览器下载文件夹中。');
        }, 500);
        
    } catch (error) {
        console.error('批量下载失败:', error);
        showModal('下载失败', `批量下载失败: ${error.message}`);
    }
}

// 显示模态框
function showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').textContent = content;
    document.getElementById('modal').classList.remove('hidden');
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', initApp);
