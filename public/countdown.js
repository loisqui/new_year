        var targetDate = new Date('2025-01-01T00:00:00').getTime();
    
        // 更新倒计时
        function updateCountdown() {
            var currentDate = new Date().getTime();
            var timeDifference = targetDate - currentDate;
    
            // 计算剩余的天数、小时、分钟和秒数
            var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
            // 格式化时间
            var formattedTime = days + '天 ' +
                                ('0' + hours).slice(-2) + '时' +
                                ('0' + minutes).slice(-2) + '分' +
                                ('0' + seconds).slice(-2) + '秒';
    
            // 更新页面上的倒计时显示
            document.getElementById('countdown').innerText = '剩余时间: ' + formattedTime;
    
            // 如果目标日期已过，则显示提示消息
            if (timeDifference < 0) {
                document.getElementById('countdown').innerText = '倒计时结束！';
            }
        }
    
        // 每秒更新一次倒计时
        setInterval(updateCountdown, 1000);
    
        // 初始加载时运行一次以避免页面刷新时出现延迟
        updateCountdown();