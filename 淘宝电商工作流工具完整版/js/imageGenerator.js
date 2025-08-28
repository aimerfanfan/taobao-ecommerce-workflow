/**
 * 淘宝电商工作流助手 - 图片生成模块
 * 负责根据产品信息生成各类营销图片
 */

// 图片生成器对象
const ImageGenerator = {
    /**
     * 生成营销图片
     * @param {Object} productInfo - 产品信息
     * @param {Object} options - 图片生成选项
     * @returns {Promise<Object>} - 生成的图片信息
     */
    async generateImages(productInfo, options) {
        console.log("开始生成图片:", options);
        
        const result = {
            main: [],
            spec: [],
            detail: []
        };
        
        try {
            // 根据选项生成不同类型的图片
            if (options.generateMain) {
                result.main = await this.generateMainImages(productInfo, options.templates.main);
            }
            
            if (options.generateSpec) {
                result.spec = await this.generateSpecImages(productInfo, options.templates.spec);
            }
            
            if (options.generateDetail) {
                result.detail = await this.generateDetailImages(productInfo, options.templates.detail);
            }
            
            return result;
        } catch (error) {
            console.error("生成图片时出错:", error);
            throw new Error(`生成图片失败: ${error.message}`);
        }
    },
    
    /**
     * 生成主图
     * @param {Object} productInfo - 产品信息
     * @param {string} template - 模板名称
     * @returns {Promise<Array>} - 生成的主图信息
     */
    async generateMainImages(productInfo, template) {
        console.log(`生成主图: 使用模板 ${template}`);
        
        try {
            // 模拟图片生成过程
            await this._delay(1500);
            
            // 根据不同模板生成不同风格的主图
            const templateStyles = {
                template1: "简约风格，突出产品本身，白色背景",
                template2: "活力风格，明亮色彩，动感设计",
                template3: "高端风格，深色背景，突出质感"
            };
            
            // 生成5张主图
            return Array(5).fill(0).map((_, index) => ({
                id: `main_${index + 1}`,
                filename: `main_${productInfo.id}_${index + 1}.png`,
                type: "main",
                template: template,
                style: templateStyles[template] || "标准风格",
                size: {
                    width: 800,
                    height: 800
                },
                // 生成真实的图片数据
                dataUrl: this._generateMockImageData('main', productInfo, { index }),
                sourceImage: productInfo.images.main[index] || productInfo.images.main[0]
            }));
        } catch (error) {
            console.error("生成主图时出错:", error);
            throw new Error(`生成主图失败: ${error.message}`);
        }
    },
    
    /**
     * 生成规格图
     * @param {Object} productInfo - 产品信息
     * @param {string} template - 模板名称
     * @returns {Promise<Array>} - 生成的规格图信息
     */
    async generateSpecImages(productInfo, template) {
        console.log(`生成规格图: 使用模板 ${template}`);
        
        try {
            // 模拟图片生成过程
            await this._delay(2000);
            
            // 根据不同模板生成不同风格的规格图
            const templateStyles = {
                template1: "表格式，清晰展示各规格参数",
                template2: "卡片式，每个规格独立展示",
                template3: "对比式，突出规格间差异"
            };
            
            // 根据产品规格生成相应数量的规格图
            return productInfo.specs.map((spec, index) => ({
                id: `spec_${index + 1}`,
                filename: `spec_${productInfo.id}_${spec.name}.png`,
                type: "spec",
                template: template,
                style: templateStyles[template] || "标准风格",
                size: {
                    width: 750,
                    height: 1000
                },
                // 生成真实的图片数据
                dataUrl: this._generateMockImageData('spec', productInfo, { spec, index }),
                specName: spec.name,
                specOptions: spec.options
            }));
        } catch (error) {
            console.error("生成规格图时出错:", error);
            throw new Error(`生成规格图失败: ${error.message}`);
        }
    },
    
    /**
     * 生成详情图
     * @param {Object} productInfo - 产品信息
     * @param {string} template - 模板名称
     * @returns {Promise<Array>} - 生成的详情图信息
     */
    async generateDetailImages(productInfo, template) {
        console.log(`生成详情图: 使用模板 ${template}`);
        
        try {
            // 模拟图片生成过程
            await this._delay(2500);
            
            // 根据不同模板生成不同风格的详情图
            const templateStyles = {
                template1: "图文结合，详细展示产品特点",
                template2: "功能展示，突出产品功能优势",
                template3: "场景应用，展示产品使用场景"
            };
            
            // 生成多张详情图
            const detailImages = [
                // 产品介绍
                {
                    id: "detail_intro",
                    filename: `detail_${productInfo.id}_intro.jpg`,
                    type: "detail",
                    subtype: "intro",
                    title: "产品介绍"
                },
                // 材质说明
                {
                    id: "detail_material",
                    filename: `detail_${productInfo.id}_material.jpg`,
                    type: "detail",
                    subtype: "material",
                    title: "材质说明"
                },
                // 尺寸说明
                {
                    id: "detail_size",
                    filename: `detail_${productInfo.id}_size.jpg`,
                    type: "detail",
                    subtype: "size",
                    title: "尺寸说明"
                },
                // 细节展示
                {
                    id: "detail_closeup",
                    filename: `detail_${productInfo.id}_closeup.jpg`,
                    type: "detail",
                    subtype: "closeup",
                    title: "细节展示"
                },
                // 使用场景
                {
                    id: "detail_scene",
                    filename: `detail_${productInfo.id}_scene.jpg`,
                    type: "detail",
                    subtype: "scene",
                    title: "使用场景"
                },
                // 优势对比
                {
                    id: "detail_comparison",
                    filename: `detail_${productInfo.id}_comparison.jpg`,
                    type: "detail",
                    subtype: "comparison",
                    title: "优势对比"
                },
                // 售后服务
                {
                    id: "detail_service",
                    filename: `detail_${productInfo.id}_service.jpg`,
                    type: "detail",
                    subtype: "service",
                    title: "售后服务"
                },
                // 购买须知
                {
                    id: "detail_notice",
                    filename: `detail_${productInfo.id}_notice.jpg`,
                    type: "detail",
                    subtype: "notice",
                    title: "购买须知"
                }
            ];
            
            // 添加共同属性
            return detailImages.map((image, index) => ({
                ...image,
                filename: `detail_${productInfo.id}_${image.subtype}.png`,
                template: template,
                style: templateStyles[template] || "标准风格",
                size: {
                    width: 750,
                    height: 1200
                },
                // 生成真实的图片数据
                dataUrl: this._generateMockImageData('detail', productInfo, { subtype: image.subtype, index })
            }));
        } catch (error) {
            console.error("生成详情图时出错:", error);
            throw new Error(`生成详情图失败: ${error.message}`);
        }
    },
    
    /**
     * 生成真实的图片数据
     * @param {string} type - 图片类型 (main/spec/detail)
     * @param {Object} productInfo - 产品信息
     * @param {Object} imageInfo - 图片信息
     * @returns {string} - Base64编码的图片数据
     */
    _generateMockImageData(type = 'main', productInfo = {}, imageInfo = {}) {
        // 创建Canvas生成真实图片
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 根据图片类型设置不同尺寸
        switch (type) {
            case 'main':
                canvas.width = 800;
                canvas.height = 800;
                break;
            case 'spec':
                canvas.width = 750;
                canvas.height = 1000;
                break;
            case 'detail':
                canvas.width = 750;
                canvas.height = 1200;
                break;
            default:
                canvas.width = 800;
                canvas.height = 800;
        }
        
        // 设置背景
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#FF4E50');
        gradient.addColorStop(1, '#F9D423');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 添加半透明白色背景
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        // 设置文字样式
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 根据图片类型添加不同内容
        if (type === 'main') {
            // 主图内容
            ctx.font = 'bold 48px Arial';
            ctx.fillText('主图', canvas.width / 2, 150);
            
            ctx.font = '32px Arial';
            ctx.fillText(productInfo.title || '产品标题', canvas.width / 2, 250);
            
            ctx.font = 'bold 64px Arial';
            ctx.fillStyle = '#FF4E50';
            ctx.fillText(`¥${productInfo.price?.current || '199'}`, canvas.width / 2, 400);
            
            ctx.font = '24px Arial';
            ctx.fillStyle = '#666666';
            ctx.fillText(`原价: ¥${productInfo.price?.original || '399'}`, canvas.width / 2, 450);
            
            // 添加装饰元素
            ctx.strokeStyle = '#FF4E50';
            ctx.lineWidth = 3;
            ctx.strokeRect(100, 500, canvas.width - 200, 200);
            
            ctx.font = '28px Arial';
            ctx.fillStyle = '#333333';
            ctx.fillText('限时特惠', canvas.width / 2, 600);
            
        } else if (type === 'spec') {
            // 规格图内容
            ctx.font = 'bold 36px Arial';
            ctx.fillText('产品规格', canvas.width / 2, 120);
            
            const specs = productInfo.specs || [
                { name: '颜色', options: ['黑色', '白色', '红色'] },
                { name: '尺码', options: ['S', 'M', 'L', 'XL'] }
            ];
            
            let yPos = 200;
            specs.forEach(spec => {
                ctx.font = 'bold 28px Arial';
                ctx.fillStyle = '#333333';
                ctx.fillText(`${spec.name}:`, canvas.width / 2, yPos);
                
                yPos += 50;
                ctx.font = '24px Arial';
                ctx.fillStyle = '#666666';
                const optionsText = spec.options.join(' / ');
                ctx.fillText(optionsText, canvas.width / 2, yPos);
                
                yPos += 80;
            });
            
        } else if (type === 'detail') {
            // 详情图内容
            ctx.font = 'bold 36px Arial';
            ctx.fillText('产品详情', canvas.width / 2, 120);
            
            const details = [
                '优质材料制造',
                '精工细作工艺',
                '舒适体验设计',
                '品质保证承诺'
            ];
            
            let yPos = 250;
            details.forEach((detail, index) => {
                ctx.font = '28px Arial';
                ctx.fillStyle = '#333333';
                ctx.fillText(`${index + 1}. ${detail}`, canvas.width / 2, yPos);
                yPos += 60;
            });
            
            // 添加特色说明
            ctx.font = 'bold 24px Arial';
            ctx.fillStyle = '#FF4E50';
            ctx.fillText('品质承诺 · 售后无忧', canvas.width / 2, yPos + 100);
        }
        
        // 添加水印
        ctx.font = '16px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.textAlign = 'right';
        ctx.fillText('淘宝电商工作流工具生成', canvas.width - 20, canvas.height - 20);
        
        // 返回Base64数据
        return canvas.toDataURL('image/png');
    },
    
    /**
     * 延迟函数
     * @param {number} ms - 延迟毫秒数
     * @returns {Promise<void>}
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * 生成水印
     * @param {Object} canvas - Canvas对象
     * @param {string} text - 水印文字
     */
    addWatermark(canvas, text) {
        const ctx = canvas.getContext('2d');
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.fillText(text, 10, canvas.height - 10);
    },
    
    /**
     * 应用滤镜效果
     * @param {Object} canvas - Canvas对象
     * @param {string} filter - 滤镜类型
     */
    applyFilter(canvas, filter) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        switch (filter) {
            case 'grayscale':
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                break;
            case 'sepia':
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                }
                break;
            case 'brightness':
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * 1.2);
                    data[i + 1] = Math.min(255, data[i + 1] * 1.2);
                    data[i + 2] = Math.min(255, data[i + 2] * 1.2);
                }
                break;
        }
        
        ctx.putImageData(imageData, 0, 0);
    },
    
    /**
     * 添加文本到图片
     * @param {Object} canvas - Canvas对象
     * @param {string} text - 要添加的文本
     * @param {Object} options - 文本选项
     */
    addText(canvas, text, options = {}) {
        const ctx = canvas.getContext('2d');
        const {
            x = 20,
            y = 40,
            fontSize = 24,
            fontFamily = 'Arial',
            color = '#000000',
            align = 'left',
            baseline = 'top'
        } = options;
        
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;
        ctx.fillText(text, x, y);
    }
};
