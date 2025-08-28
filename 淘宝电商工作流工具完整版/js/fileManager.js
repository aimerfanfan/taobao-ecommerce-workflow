/**
 * 淘宝电商工作流助手 - 文件管理模块
 * 负责保存和管理生成的图片文件
 */

// 文件管理器对象
const FileManager = {
    /**
     * 保存生成的图片
     * @param {Object} images - 生成的图片对象
     * @param {Object} productInfo - 产品信息
     * @param {Object} options - 保存选项
     * @returns {Promise<Object>} - 保存结果
     */
    async saveImages(images, productInfo, options) {
        console.log("开始保存图片:", options);
        
        const result = {
            basePath: options.path,
            productFolder: "",
            savedFiles: {
                main: [],
                spec: [],
                detail: []
            },
            totalCount: 0
        };
        
        try {
            // 创建产品文件夹
            const productFolder = this._createProductFolder(productInfo, options);
            result.productFolder = productFolder;
            
            // 保存主图
            if (images.main && images.main.length > 0) {
                const mainFolder = this._createSubfolder(productFolder, "主图", options);
                result.savedFiles.main = await this._saveImageFiles(images.main, mainFolder, options);
            }
            
            // 保存规格图
            if (images.spec && images.spec.length > 0) {
                const specFolder = this._createSubfolder(productFolder, "规格图", options);
                result.savedFiles.spec = await this._saveImageFiles(images.spec, specFolder, options);
            }
            
            // 保存详情图
            if (images.detail && images.detail.length > 0) {
                const detailFolder = this._createSubfolder(productFolder, "详情图", options);
                result.savedFiles.detail = await this._saveImageFiles(images.detail, detailFolder, options);
            }
            
            // 计算总保存数量
            result.totalCount = 
                result.savedFiles.main.length + 
                result.savedFiles.spec.length + 
                result.savedFiles.detail.length;
            
            return result;
        } catch (error) {
            console.error("保存图片时出错:", error);
            throw new Error(`保存图片失败: ${error.message}`);
        }
    },
    
    /**
     * 创建产品文件夹
     * @param {Object} productInfo - 产品信息
     * @param {Object} options - 选项
     * @returns {string} - 创建的文件夹路径
     */
    _createProductFolder(productInfo, options) {
        // 根据命名规则生成文件夹名
        let folderName;
        switch (options.namingRule) {
            case 'productid':
                folderName = `产品_${productInfo.id}`;
                break;
            case 'productname':
                // 从产品名称中提取前10个字符作为文件夹名
                folderName = `产品_${productInfo.title.substring(0, 10).replace(/[\\\/:*?<>|]/g, '')}`;
                break;
            case 'datetime':
                const now = new Date();
                folderName = `产品_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${productInfo.id}`;
                break;
            case 'custom':
                folderName = `淘宝产品_${productInfo.id}`;
                break;
            default:
                folderName = `产品_${productInfo.id}`;
        }
        
        // 构建完整路径
        const fullPath = `${options.path}/${folderName}`;
        
        // 在实际应用中，这里应该创建文件夹
        console.log(`创建产品文件夹: ${fullPath}`);
        
        // 模拟创建文件夹
        this._simulateCreateFolder(fullPath);
        
        return fullPath;
    },
    
    /**
     * 创建子文件夹
     * @param {string} parentFolder - 父文件夹路径
     * @param {string} name - 子文件夹名称
     * @param {Object} options - 选项
     * @returns {string} - 创建的子文件夹路径
     */
    _createSubfolder(parentFolder, name, options) {
        // 如果不需要创建子文件夹，直接返回父文件夹
        if (!options.createSubfolders) {
            return parentFolder;
        }
        
        // 构建完整路径
        const fullPath = `${parentFolder}/${name}`;
        
        // 在实际应用中，这里应该创建文件夹
        console.log(`创建子文件夹: ${fullPath}`);
        
        // 模拟创建文件夹
        this._simulateCreateFolder(fullPath);
        
        return fullPath;
    },
    
    /**
     * 保存图片文件
     * @param {Array} images - 图片数组
     * @param {string} folder - 保存文件夹
     * @param {Object} options - 选项
     * @returns {Promise<Array>} - 保存的文件信息
     */
    async _saveImageFiles(images, folder, options) {
        console.log(`保存图片文件到: ${folder}`);
        
        const savedFiles = [];
        
        // 模拟保存延迟
        await this._delay(1000);
        
        // 保存每张图片
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            try {
                // 构建完整文件路径
                const filePath = `${folder}/${image.filename}`;
                
                // 在实际应用中，这里应该将图片数据保存到文件
                console.log(`保存图片: ${filePath}`);
                
                // 添加延迟避免浏览器阻止多个下载
                if (i > 0) {
                    await this._delay(500); // 每个下载间隔500ms
                }
                
                // 真实下载文件
                this._simulateSaveFile(filePath, image.dataUrl, image.filename);
                
                // 记录保存的文件信息
                savedFiles.push({
                    path: filePath,
                    filename: image.filename,
                    type: image.type,
                    size: image.size
                });
            } catch (error) {
                console.error(`保存图片 ${image.filename} 时出错:`, error);
                // 继续保存其他图片
            }
        }
        
        return savedFiles;
    },
    
    /**
     * 导出到网盘
     * @param {Object} saveResult - 保存结果
     * @param {Object} options - 导出选项
     * @returns {Promise<Object>} - 导出结果
     */
    async exportToCloudDrive(saveResult, options) {
        console.log("开始导出到网盘:", options);
        
        try {
            // 模拟导出延迟
            await this._delay(2000);
            
            // 这里应该实现与各种网盘API的集成
            // 例如百度网盘、阿里云盘、OneDrive等
            
            // 返回模拟导出结果
            return {
                success: true,
                platform: options.platform || "默认网盘",
                exportPath: options.cloudPath || "/淘宝产品素材",
                fileCount: saveResult.totalCount,
                url: "https://pan.example.com/s/abc123"
            };
        } catch (error) {
            console.error("导出到网盘时出错:", error);
            throw new Error(`导出到网盘失败: ${error.message}`);
        }
    },
    
    /**
     * 批量重命名文件
     * @param {Array} files - 文件列表
     * @param {string} pattern - 命名模式
     * @returns {Promise<Array>} - 重命名结果
     */
    async batchRename(files, pattern) {
        console.log("批量重命名文件:", pattern);
        
        const result = [];
        
        try {
            for (const file of files) {
                // 生成新文件名
                const newName = pattern
                    .replace('{id}', file.id || '')
                    .replace('{type}', file.type || '')
                    .replace('{index}', files.indexOf(file) + 1)
                    .replace('{date}', this._getFormattedDate());
                
                // 构建新路径
                const oldPath = file.path;
                const newPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1) + newName;
                
                // 在实际应用中，这里应该重命名文件
                console.log(`重命名文件: ${oldPath} -> ${newPath}`);
                
                // 记录重命名结果
                result.push({
                    oldPath,
                    newPath,
                    success: true
                });
            }
            
            return result;
        } catch (error) {
            console.error("批量重命名文件时出错:", error);
            throw new Error(`批量重命名文件失败: ${error.message}`);
        }
    },
    
    /**
     * 获取格式化的日期字符串
     * @returns {string} - 格式化的日期字符串
     */
    _getFormattedDate() {
        const now = new Date();
        return `${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`;
    },
    
    /**
     * 模拟创建文件夹
     * @param {string} path - 文件夹路径
     */
    _simulateCreateFolder(path) {
        // 在实际应用中，这里应该调用系统API创建文件夹
        // 例如使用Node.js的fs.mkdirSync或浏览器扩展API
        console.log(`[模拟] 创建文件夹: ${path}`);
    },
    
    /**
     * 真实保存文件（浏览器下载）
     * @param {string} path - 文件路径
     * @param {string} data - 文件数据（Base64格式）
     * @param {string} filename - 文件名
     */
    _simulateSaveFile(path, data, filename) {
        try {
            // 如果是Base64数据，直接下载
            if (data && data.startsWith('data:image/')) {
                this._downloadFile(data, filename || this._extractFilename(path));
                console.log(`✅ 已下载文件: ${filename || this._extractFilename(path)}`);
            } else {
                console.log(`[模拟] 保存文件: ${path} (数据长度: ${data ? data.length : 0}字节)`);
            }
        } catch (error) {
            console.error(`下载文件失败: ${error.message}`);
        }
    },

    /**
     * 下载文件到浏览器
     * @param {string} dataUrl - 数据URL
     * @param {string} filename - 文件名
     */
    _downloadFile(dataUrl, filename) {
        try {
            // 创建下载链接
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = filename;
            link.style.display = 'none';
            
            // 添加到DOM并触发点击
            document.body.appendChild(link);
            
            // 使用setTimeout确保DOM更新完成
            setTimeout(() => {
                link.click();
                
                // 清理DOM
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }, 10);
            
        } catch (error) {
            console.error(`下载文件失败: ${filename}`, error);
            
            // 备用方案：在新窗口中打开图片
            try {
                const newWindow = window.open();
                newWindow.document.write(`<img src="${dataUrl}" style="max-width:100%;height:auto;"><br><a href="${dataUrl}" download="${filename}">点击下载 ${filename}</a>`);
                newWindow.document.title = filename;
            } catch (fallbackError) {
                console.error('备用下载方案也失败:', fallbackError);
            }
        }
    },

    /**
     * 从路径中提取文件名
     * @param {string} path - 文件路径
     * @returns {string} - 文件名
     */
    _extractFilename(path) {
        return path.split('/').pop() || 'download.png';
    },

    /**
     * 批量下载所有图片为ZIP文件
     * @param {Object} images - 生成的图片对象
     * @param {Object} productInfo - 产品信息
     * @returns {Promise<void>}
     */
    async downloadAllAsZip(images, productInfo) {
        try {
            console.log('🗜️ 开始创建ZIP文件...');
            
            // 检查JSZip是否可用
            if (typeof JSZip === 'undefined') {
                throw new Error('JSZip库未加载，无法创建ZIP文件');
            }
            
            const zip = new JSZip();
            
            // 添加主图到ZIP
            if (images.main && images.main.length > 0) {
                const mainFolder = zip.folder('主图');
                for (const image of images.main) {
                    if (image.dataUrl) {
                        const base64Data = image.dataUrl.split(',')[1];
                        mainFolder.file(image.filename, base64Data, { base64: true });
                    }
                }
            }
            
            // 添加规格图到ZIP
            if (images.spec && images.spec.length > 0) {
                const specFolder = zip.folder('规格图');
                for (const image of images.spec) {
                    if (image.dataUrl) {
                        const base64Data = image.dataUrl.split(',')[1];
                        specFolder.file(image.filename, base64Data, { base64: true });
                    }
                }
            }
            
            // 添加详情图到ZIP
            if (images.detail && images.detail.length > 0) {
                const detailFolder = zip.folder('详情图');
                for (const image of images.detail) {
                    if (image.dataUrl) {
                        const base64Data = image.dataUrl.split(',')[1];
                        detailFolder.file(image.filename, base64Data, { base64: true });
                    }
                }
            }
            
            // 创建产品信息文件
            const productInfoText = this._generateProductInfoText(productInfo);
            zip.file('产品信息.txt', productInfoText);
            
            console.log('📦 正在生成ZIP文件...');
            
            // 生成ZIP文件
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            // 下载ZIP文件
            const zipFilename = `产品_${productInfo.id}_图片素材.zip`;
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = zipFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            console.log(`✅ ZIP文件已下载: ${zipFilename}`);
            
        } catch (error) {
            console.error('批量下载失败:', error);
            throw new Error(`批量下载失败: ${error.message}`);
        }
    },

    /**
     * 生成产品信息文本
     * @param {Object} productInfo - 产品信息
     * @returns {string} - 产品信息文本
     */
    _generateProductInfoText(productInfo) {
        const info = [
            '=== 产品信息 ===',
            `产品ID: ${productInfo.id}`,
            `产品标题: ${productInfo.title}`,
            `店铺名称: ${productInfo.shop?.name || '未知'}`,
            `当前价格: ¥${productInfo.price?.current || '未知'}`,
            `原价: ¥${productInfo.price?.original || '未知'}`,
            `销量: ${productInfo.sales?.count || '未知'}`,
            `评论数: ${productInfo.sales?.comments || '未知'}`,
            '',
            '=== 产品规格 ===',
        ];
        
        if (productInfo.specs) {
            productInfo.specs.forEach(spec => {
                info.push(`${spec.name}: ${spec.options.join(', ')}`);
            });
        }
        
        info.push('');
        info.push('=== 产品属性 ===');
        
        if (productInfo.attributes) {
            productInfo.attributes.forEach(attr => {
                info.push(`${attr.name}: ${attr.value}`);
            });
        }
        
        info.push('');
        info.push('=== 产品描述 ===');
        info.push(productInfo.description || '暂无描述');
        
        info.push('');
        info.push('=== 卖点 ===');
        if (productInfo.sellingPoints) {
            productInfo.sellingPoints.forEach((point, index) => {
                info.push(`${index + 1}. ${point}`);
            });
        }
        
        info.push('');
        info.push(`生成时间: ${new Date().toLocaleString()}`);
        info.push('生成工具: 淘宝电商工作流助手');
        
        return info.join('\n');
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
     * 检查路径是否存在
     * @param {string} path - 路径
     * @returns {boolean} - 是否存在
     */
    _pathExists(path) {
        // 在实际应用中，这里应该检查路径是否存在
        // 例如使用Node.js的fs.existsSync或浏览器扩展API
        return true;
    },
    
    /**
     * 获取文件列表
     * @param {string} folder - 文件夹路径
     * @returns {Promise<Array>} - 文件列表
     */
    async getFileList(folder) {
        console.log(`获取文件列表: ${folder}`);
        
        try {
            // 在实际应用中，这里应该读取文件夹内容
            // 例如使用Node.js的fs.readdirSync或浏览器扩展API
            
            // 返回模拟文件列表
            return [
                { name: "示例文件1.jpg", path: `${folder}/示例文件1.jpg`, size: 1024 * 50, type: "image/jpeg" },
                { name: "示例文件2.jpg", path: `${folder}/示例文件2.jpg`, size: 1024 * 75, type: "image/jpeg" },
                { name: "示例文件3.jpg", path: `${folder}/示例文件3.jpg`, size: 1024 * 60, type: "image/jpeg" }
            ];
        } catch (error) {
            console.error("获取文件列表时出错:", error);
            throw new Error(`获取文件列表失败: ${error.message}`);
        }
    }
};
