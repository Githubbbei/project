window.onload = function() {

	//轮播容器
	var container = document.getElementById('container');
	// 图片列表
	var list = document.getElementById('list');
	// 获得图片的数量
	var imageCount = list.getElementsByTagName('img').length
	// 切换按钮组
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	// 左右箭头
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	//屏幕宽度
	var containerWidth = screen.width;
	// 当前索引
	var currIndex = 0;

	// 单幅图片宽度
	var imagesWidth = 1920;
	// 动画同步标志
	var isAnimate = false;


	// 左箭头单击事件
	prev.onclick = function() {
		// 判断动画是否进行
		if (isAnimate) {
			return;
		}
	
		// 索引递增
		currIndex --;
		if (currIndex < 0) {
			currIndex = imageCount - 3;				
		}
		animate(imagesWidth);
		

	}

	// 右箭头单击事件
	next.onclick = function() {
		// 判断动画是否进行
		if (isAnimate) {
			return;
		}
		// 索引递减
		currIndex ++;
		if (currIndex > imageCount - 3) {
			currIndex = 0;

		}
		animate(-imagesWidth);
	}

	// 遍历切换按钮组
	for (var i = 0;i < buttons.length;i ++) {

		(function(index) {
			buttons[i].onclick = function() {

				// 判断动画是否进行
				if (isAnimate) {
					return;
				}
				var offset = -imagesWidth * (index - currIndex);
				currIndex = index;//记录当前索引
				animate(offset);
				

			}
		})(i);

	}

	list.style.left = -imagesWidth + (-imagesWidth + parseInt(screen.width))/2 + 'px';
	
	// 运动函数
	function animate(offset) {

		// 计算出新的位置
		var newLeft = parseInt(list.style.left) + offset;

		//运动参数
		var time = 800;//动画的运动时间
		var interval = 40;//每隔多少毫秒执行一次
		var speed = offset / (time / interval);//每次移动的像素数

		// go函数
		function go() {

			// 获得当前位置
			var left = parseInt(list.style.left);

			// 判断是否到达目标位置
			if(speed > 0 && left >= newLeft || speed < 0 && left <= newLeft) {
				// 终止定时器
				clearInterval(timerId);
				// 动画中止
				isAnimate = false;
				// 防止误差，直接设置到目标位置
				left = list.style.left = newLeft + 'px';

				// 判断是否到达替身图
				if (parseInt(left) == (-imagesWidth + parseInt(screen.width))/2) {
					list.style.left = -imagesWidth * (imageCount - 2) + (-1920 + parseInt(screen.width))/2 + 'px';
				}

				if (parseInt(left) == -imagesWidth * (imageCount - 1) + (-1920 + parseInt(screen.width))/2) {
					list.style.left = -imagesWidth + (-imagesWidth + parseInt(screen.width))/2 + 'px';
				}
				return;
			}
			// 递增递减
			list.style.left = left + speed + 'px';
		}

		//定时器
		var timerId = setInterval(go,interval);
		// 动画进行中
		isAnimate = true;
		highlight();//高亮


	}
	// 高亮函数
	function highlight() {
		for (var i = 0;i < buttons.length;i ++) {
			buttons[i].className = '';
		}

		// 当前按钮高亮
		buttons[currIndex].className = 'on';
	}

	// 自动播放
	function autoPlay() {
		next.click();//产生用户单击右箭头事件
	}

	//自动播放的定时器
	var timerId = setInterval(autoPlay,3000);

	// 鼠标移上终止自动播放
	container.onmouseenter = function() {
		clearInterval(timerId);
	}

	// 鼠标离开重新自动播放
	container.onmouseleave = function() {
		timerId = setInterval(autoPlay,3000);
	}

	// 滚动条事件
	$(window).scroll(function(event) {
		
		// 获得滚动条卷去的大小
		var sTop = $(window).scrollTop();		

		// 如果滚动条超过200像素，显示回到顶部的按钮
		if (sTop >= 200) {
			$('.BackTop').slideDown(500);			
		} else {
			$('.BackTop').slideUp(500);
		}

	});

	// 滚动条回到顶部
	$('.BackTop').click(function(event) {
		
		$('html,body').animate({scrollTop:0}, 1000);

	});


	

}
