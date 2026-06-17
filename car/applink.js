/**
 * 通用 App 跳轉與下載判斷工具
 * @param {Object} config - App 的相關連結設定物件
 */
function openOrDownloadApp(config) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // 預設防呆，確保參數有傳入
    const settings = {
        iosScheme: config.iosScheme || '',
        androidScheme: config.androidScheme || '',
        appStore: config.appStore || '',
        playStore: config.playStore || '',
        officialWebsite: config.officialWebsite || ''
    };

    // 1. 判斷是否為 iOS 行動裝置
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        const startTime = Date.now();
        
        // 嘗試喚醒 iOS App
        window.location.href = settings.iosScheme;
        
        // 若超時沒跳轉，代表沒安裝，導向 App Store
        setTimeout(() => {
            if (Date.now() - startTime < 3000) {
                window.location.href = settings.appStore;
            }
        }, 2500);
    } 
    // 2. 判斷是否為 Android 行動裝置
    else if (/android/i.test(userAgent)) {
        const startTime = Date.now();
        
        // 嘗試喚醒 Android App
        window.location.href = settings.androidScheme;
        
        // 若超時沒跳轉，代表沒安裝，導向 Google Play
        setTimeout(() => {
            if (Date.now() - startTime < 3000) {
                window.location.href = settings.playStore;
            }
        }, 2500);
    } 
    // 3. 判定為 PC / 電腦版網頁
    else {
        window.location.href = settings.officialWebsite;
    }
}