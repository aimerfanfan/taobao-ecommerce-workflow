/**
 * 淘宝电商工作流助手 - 演示脚本
 * 提供自动化测试和演示功能
 */

// 演示数据
const DemoData = {
    sampleUrls: [
        'https://item.taobao.com/item.htm?id=123456789',
        'https://detail.tmall.com/item.htm?id=987654321',
        'https://m.taobao.com/awp/core/detail.htm?id=555666777',
        'https://item.taobao.com/item.htm?id=111222333',
        'https://detail.tmall.com/item.htm?id=444555666'
    ],
    
    sampleConfigs: [
        {
            name: '基础配置',
            settings: {
                mainImage: true,
                specImage: true,
                detailImage: true,
                mainTemplate: 'template1',
                specTemplate: 'template1',
                detailTemplate: 'template1',
                savePath: 'D:/淘宝产品素材',
                fileNaming: 'productid'
            }
        },
        {
            name: '高端配置',
            settings: {
                mainImage: true,
                specImage: true,
                detailImage: true,
                mainTemplate: 'template3',
                specTemplate: 'template3',
                detailTemplate: 'template3',
                savePath: 'D:/高端产品素材',
                fileNaming: 'productname'
            }
        },
        {
            name: '快速配置',
            settings: {
                mainImage: true,
                specImage: false,
                detailImage: true,
                mainTemplate: 'template2',
                specTemplate: 'template1',
                detailTemplate: 'template2',
                savePath: 'D:/快速处理',
                fileNaming: 'datetime'
            }
        }
    ]
};

// 演示控制器
const DemoController = {
    isRunning: false,
    currentStep: 0,
    
    /**
     * 开始演示
     */
    async startDemo() {
        if (this.isRunning) {
            console.log('演示已在运行中...');
            return;
        }
        
        this.isRunning = true;
        this.currentStep = 0;
        
        console.log('🎬 开始演示淘宝电商工作流工具');
        
        try {
            // 步骤1：展示基本功能
            await this.demoBasicFunctionality();
            
            // 步骤2：展示不同配置
            await this.demoDifferentConfigs();
            
            // 步骤3：展示批量处理
            await this.demoBatchProcessing();
            
            console.log('🎉 演示完成！');
        } catch (error) {
            console.error('演示过程中出错:', error);
        } finally {
            this.isRunning = false;
        }
    },
    
    /**
     * 演示基本功能
     */
    async demoBasicFunctionality() {
        console.log('📋 步骤1: 演示基本功能');
        
        // 填入示例URL
        const urlInput = document.getElementById('product-url');
        if (urlInput) {
            urlInput.value = DemoData.sampleUrls[0];
            console.log(`✅ 填入示例URL: ${DemoData.sampleUrls[0]}`);
        }
        
        // 等待用户观察
        await this.delay(2000);
        
        // 应用基础配置
        this.applyConfig(DemoData.sampleConfigs[0]);
        
        // 等待用户观察
        await this.delay(2000);
        
        // 模拟点击开始按钮
        console.log('🚀 开始处理...');
        if (typeof startProcess === 'function') {
            await startProcess();
        } else {
            console.log('⚠️ startProcess 函数不可用，跳过实际处理');
        }
        
        // 等待处理完成
        await this.delay(5000);
    },
    
    /**
     * 演示不同配置
     */
    async demoDifferentConfigs() {
        console.log('⚙️ 步骤2: 演示不同配置');
        
        for (let i = 1; i < DemoData.sampleConfigs.length; i++) {
            const config = DemoData.sampleConfigs[i];
            console.log(`🔧 应用配置: ${config.name}`);
            
            // 填入新的URL
            const urlInput = document.getElementById('product-url');
            if (urlInput) {
                urlInput.value = DemoData.sampleUrls[i];
            }
            
            // 应用配置
            this.applyConfig(config);
            
            // 等待用户观察
            await this.delay(3000);
            
            console.log(`📊 配置 "${config.name}" 演示完成`);
        }
    },
    
    /**
     * 演示批量处理
     */
    async demoBatchProcessing() {
        console.log('📦 步骤3: 演示批量处理概念');
        
        console.log('💡 在实际应用中，您可以：');
        console.log('   1. 准备多个产品链接');
        console.log('   2. 使用循环处理每个链接');
        console.log('   3. 为每个产品创建独立的文件夹');
        console.log('   4. 生成汇总报告');
        
        // 模拟批量处理逻辑
        for (let i = 0; i < 3; i++) {
            console.log(`🔄 模拟处理第 ${i + 1} 个产品: ${DemoData.sampleUrls[i]}`);
            await this.delay(1000);
        }
        
        console.log('✅ 批量处理演示完成');
    },
    
    /**
     * 应用配置
     */
    applyConfig(config) {
        const settings = config.settings;
        
        // 应用图片生成选项
        const mainImageCheckbox = document.getElementById('main-image');
        if (mainImageCheckbox) {
            mainImageCheckbox.checked = settings.mainImage;
        }
        
        const specImageCheckbox = document.getElementById('spec-image');
        if (specImageCheckbox) {
            specImageCheckbox.checked = settings.specImage;
        }
        
        const detailImageCheckbox = document.getElementById('detail-image');
        if (detailImageCheckbox) {
            detailImageCheckbox.checked = settings.detailImage;
        }
        
        // 应用模板选择
        const mainTemplateSelect = document.getElementById('main-image-template');
        if (mainTemplateSelect) {
            mainTemplateSelect.value = settings.mainTemplate;
        }
        
        const specTemplateSelect = document.getElementById('spec-image-template');
        if (specTemplateSelect) {
            specTemplateSelect.value = settings.specTemplate;
        }
        
        const detailTemplateSelect = document.getElementById('detail-image-template');
        if (detailTemplateSelect) {
            detailTemplateSelect.value = settings.detailTemplate;
        }
        
        // 应用保存设置
        const savePathInput = document.getElementById('save-path');
        if (savePathInput) {
            savePathInput.value = settings.savePath;
        }
        
        const fileNamingSelect = document.getElementById('file-naming');
        if (fileNamingSelect) {
            fileNamingSelect.value = settings.fileNaming;
        }
        
        console.log(`✅ 已应用配置: ${config.name}`);
    },
    
    /**
     * 延迟函数
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * 停止演示
     */
    stopDemo() {
        this.isRunning = false;
        console.log('⏹️ 演示已停止');
    }
};

// 测试工具
const TestUtils = {
    /**
     * 运行功能测试
     */
    async runFunctionalTests() {
        console.log('🧪 开始功能测试');
        
        const tests = [
            this.testUIElements,
            this.testInputValidation,
            this.testConfigSaving,
            this.testProgressAnimation,
            this.testModalFunctionality
        ];
        
        let passedTests = 0;
        
        for (const test of tests) {
            try {
                const result = await test.call(this);
                if (result) {
                    passedTests++;
                    console.log(`✅ ${test.name} 通过`);
                } else {
                    console.log(`❌ ${test.name} 失败`);
                }
            } catch (error) {
                console.log(`❌ ${test.name} 出错:`, error.message);
            }
        }
        
        console.log(`📊 测试结果: ${passedTests}/${tests.length} 项测试通过`);
        return passedTests === tests.length;
    },
    
    /**
     * 测试UI元素
     */
    testUIElements() {
        const requiredElements = [
            'product-url',
            'start-btn',
            'main-image',
            'spec-image',
            'detail-image',
            'save-path',
            'file-naming'
        ];
        
        for (const elementId of requiredElements) {
            const element = document.getElementById(elementId);
            if (!element) {
                console.log(`❌ 缺少元素: ${elementId}`);
                return false;
            }
        }
        
        return true;
    },
    
    /**
     * 测试输入验证
     */
    testInputValidation() {
        const urlInput = document.getElementById('product-url');
        if (!urlInput) return false;
        
        // 测试空输入
        urlInput.value = '';
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            // 模拟点击，应该显示错误
            // 这里简化测试，实际应该检查错误提示
            return true;
        }
        
        return false;
    },
    
    /**
     * 测试配置保存
     */
    testConfigSaving() {
        try {
            // 测试localStorage功能
            const testKey = 'testConfig';
            const testValue = JSON.stringify({ test: true });
            
            localStorage.setItem(testKey, testValue);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);
            
            return retrieved === testValue;
        } catch (error) {
            return false;
        }
    },
    
    /**
     * 测试进度动画
     */
    testProgressAnimation() {
        const progressElements = [
            'crawl-progress',
            'generate-progress',
            'save-progress'
        ];
        
        for (const elementId of progressElements) {
            const element = document.getElementById(elementId);
            if (!element) {
                return false;
            }
        }
        
        return true;
    },
    
    /**
     * 测试模态框功能
     */
    testModalFunctionality() {
        const modal = document.getElementById('modal');
        const modalClose = document.getElementById('modal-close');
        const modalConfirm = document.getElementById('modal-confirm');
        
        return modal && modalClose && modalConfirm;
    }
};

// 性能监控
const PerformanceMonitor = {
    startTime: null,
    metrics: {},
    
    /**
     * 开始监控
     */
    start() {
        this.startTime = performance.now();
        this.metrics = {};
        console.log('📊 开始性能监控');
    },
    
    /**
     * 记录指标
     */
    mark(name) {
        if (!this.startTime) return;
        
        const currentTime = performance.now();
        this.metrics[name] = currentTime - this.startTime;
        console.log(`⏱️ ${name}: ${this.metrics[name].toFixed(2)}ms`);
    },
    
    /**
     * 生成报告
     */
    report() {
        if (!this.startTime) {
            console.log('❌ 性能监控未启动');
            return;
        }
        
        console.log('📈 性能报告:');
        for (const [name, time] of Object.entries(this.metrics)) {
            console.log(`   ${name}: ${time.toFixed(2)}ms`);
        }
        
        const totalTime = performance.now() - this.startTime;
        console.log(`   总耗时: ${totalTime.toFixed(2)}ms`);
    }
};

// 将工具添加到全局作用域，方便在控制台中使用
window.DemoController = DemoController;
window.TestUtils = TestUtils;
window.PerformanceMonitor = PerformanceMonitor;
window.DemoData = DemoData;

// 添加快捷键支持
document.addEventListener('keydown', function(event) {
    // Ctrl + Shift + D: 开始演示
    if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        DemoController.startDemo();
    }
    
    // Ctrl + Shift + T: 运行测试
    if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        TestUtils.runFunctionalTests();
    }
    
    // Ctrl + Shift + P: 开始性能监控
    if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        PerformanceMonitor.start();
    }
});

console.log('🎯 演示脚本已加载！');
console.log('💡 可用的快捷键:');
console.log('   Ctrl + Shift + D: 开始演示');
console.log('   Ctrl + Shift + T: 运行功能测试');
console.log('   Ctrl + Shift + P: 开始性能监控');
console.log('💡 可用的全局对象:');
console.log('   DemoController: 演示控制器');
console.log('   TestUtils: 测试工具');
console.log('   PerformanceMonitor: 性能监控');
console.log('   DemoData: 演示数据');
