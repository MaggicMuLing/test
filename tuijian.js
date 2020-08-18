	(function (win, doc) {
		  var docEl = doc.documentElement,
		      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		  function refresh() {
		      var w = docEl.clientWidth,
		          dpr = win.devicePixelRatio || 1;
		      docEl.style.fontSize = 100 * (w / 750) + 'px';
		      function setBodyFontSize() {
		          if (doc.body) {
		              doc.body.style.fontSize = '16px';
		          } else {
		              doc.addEventListener('DOMContentLoaded', refresh)
		          }
		      }
		      setBodyFontSize();
		  };
		  refresh();
		
		  if (!doc.addEventListener) return;
		  win.addEventListener(resizeEvt, refresh, false);
		})(window, document);
		
	 

	$(document).ready(function(){
		var urlParam= window.location.search;
		var loc = urlParam.substring(urlParam.lastIndexOf('=')+1, urlParam.length);	
		
		
		if(loc==12){
			$("#all1body").hide();
			$("#all2").show();
			$(".two").find(".tiyan").addClass('after').siblings().removeClass("after");
		}
		
		/*$("#tuijian").click(function(){
			$("#all1body").show();
			$("#all2").hide();
		
		})*/
		
		
		$(".top img").click(function(){			
				window.location="index.html"
		
		})
		
		/*$(".tiyan").click(function(){
			$("#all1body").hide();
			$("#all2").show();
		})*/
		
		/*$(".after").click(function(){
//			$("#all2").css("display","none");
//			$("#all1body").css("display","inline");
			$("#all1body").hide();
			$("#all2").show();
			
		})*/
		
	
		$(".ss").click(function(){
			$(location).attr("href","search.html")
		});

		//点击跳转进入详情页
		$("#all2").on("click",'.al2left',function(){
			$(".jiazai").css("display","block");
			var goodsid=$(this).find('.goodsid').text();
			/*location.href="详情页.html?goodsid";*/
			$.ajax({
				type:"post",
				url:"https://wsmtapi.aipokj.cn//v1/goods/detail",
				async:true,
				data:{
					goodsId:goodsid
				},
				success:function(data){
					$(".jiazai").css("display","none");
					location.href="xiangqing.html?goodsid=" + goodsid;
					/*location.href=`xiangqing.html?${goodsid}`;*/
				}
			});
		})
		
		//点击跳转进入详情页(2)
		$("#all2").on("click",'.all2down1',function(){
			$(".jiazai").css("display","block");
			var goodsid=$(this).find('.nhgoodsID').text();
			$.ajax({
				type:"post",
				url:"https://wsmtapi.aipokj.cn//v1/goods/detail",
				async:true,
				data:{
					goodsId:goodsid
				},
				success:function(data){
					$(".jiazai").css("display","none");
					location.href="xiangqing.html?goodsid=" + goodsid;
			       /*	console.log(data)
					location.href=`xiangqing.html?${goodsid}`;*/
				}
			});
		})
		
	//点击tab栏跳转	
		$(".two p").click(function(){
			var id = $(this).data('type')
			$(this).addClass('after').siblings().removeClass("after");	
			$('.index').hide()
			$('.index' + id).show()
			/*	if(aa=="推荐" || aa =="服装" || aa=="美妆"){
					$("#all1body").show();
					$("#all2").hide();
					
				}else {
					$("#all1body").hide();
					$("#all2").show();
				}	*/
		})
		//商品
		$.ajax({
			type:"GET",
			async:true,
			url:"https://wsmtapi.aipokj.cn/v1/goods/goodsAdList",
			success: function(data){
					
					for(var i=0; i<3; i++){
						var url=data.data;
						$(".down").append(`<div id="shop1" class="shop1">
			 				<img class="imga" src="${url[0].coverImage[i]}" style="width: 1.84rem;height: 1.84rem;" />
			 				<img class="imgb" src="img/路径 2.png" style="width: 1.61rem;height:0.44rem;" />
			 				<font class="f1">补贴</font>
			 			</div>`)			
					}
					$(".shop1").append(`<font class="f2">￥${parseFloat(url[0].price).toFixed(0)}</font>`)
			}
			
		});
	
		$.ajax({
					type:"POST",
					url:"https://wsmtapi.aipokj.cn/v1/home/list",
					dataType:"Json",
					async:true,
					data:{
						pid:63,
						cate:"默认推荐",
						},
					success:function(data){
					//精选商家
					var aData=data.data;
					for(var i=0; i<2; i++){
						var choice=aData.choice[i];
						$(".ab").append(`
							<img src="${choice.UserHeader}" style="width:1.4rem; height: 1.4rem; border-radius: 0.13rem; flex-shrink: 0;" />
							<div class="stor1">
							<font style="font-size: 0.26rem;">${choice.Title}</font>
							<button class="bt">申请代理</button>
							</div>
						`)
					}
					
					//一件代发，厂家直供，免费代理，精选大牌
					for(var i=0; i<2; i++){
						var url=aData.yjdf[i].UserHeader;
						var title=aData.yjdf[i].Title.substring(0,5);
						$("#da1 .down3body").append(`<div class="down3left">
								<img class="s3img" src="${url}" style="width: 1.4rem; height: 1.4rem;"/>
								<button class="s3bt">申请代理</button>
								<p class="s3p">${title}</p>
							</div>`)
						
						$("#da2 .down3body").append(`<div class="down3left">
								<img class="s3img" src="${aData.cszg[i].UserHeader}" style="width: 1.4rem; height: 1.4rem;"/>
								<button class="s3bt">申请代理</button>
								<p class="s3p">${aData.cszg[i].Title.substring(0,5)}</p>
							</div>`)
						$("#da3 .down3body").append(`<div class="down3left">
								<img class="s3img" src="${aData.mfdl[i].UserHeader}" style="width: 1.4rem; height: 1.4rem;"/>
								<button class="s3bt">申请代理</button>
								<p class="s3p">${aData.mfdl[i].Title.substring(0,5)}</p>
							</div>`)
						$("#da4 .down3body").append(`<div class="down3left">
								<img class="s3img" src="${aData.jxdp[i].UserHeader}" style="width: 1.4rem; height: 1.4rem;"/>
								<button class="s3bt">申请代理</button>
								<p class="s3p">${aData.jxdp[i].Title.substring(0,5)}</p>
							</div>`)
				    	}
				
					//认证商家
					for(var i=0; i<3; i++){
						var rzsj=aData.rzsj[i];
						$(".down4late").append(`
							<div class="down4a">
							<img src="${rzsj.UserHeader}" style="width: 2.1rem; height: 2.1rem;" />
							<button class="down4abtn">申请代理</button>
							<p>${rzsj.Title.substring(0,5)}</p>`)		
						}
					}
			})

		//最后列表
			$.ajax({
				type:"POST",
				url:"https://wsmtapi.aipokj.cn/v1/home/proxyList",
				dataType:"Json",
				async:true,
				data:{
					pid:63,
					cate:"默认推荐",
					},
				success:function(data){
					var aData=data.data[0];	
						$(".down5head").prepend(`<img class="down5a" src="${aData.UserHeader}"/>`)
						$(".down5b").prepend(`<p>${aData.Title}</p>`)
						var arr=aData.Tag2.split(";");		
						$(".down5b").append(`<font>${arr[0]}</font>
								<font>${arr[1]}</font>
								<font>${arr[2]}</font>`)		
						for(var i=1;i<=3;i++){
							$(".down5body").append(`
								<img src="${data.data[i].UserHeader}" style="width: 2.08rem; height:2.08rem;" />`)
						}			
					}
				
			})
	
		//体验专区
		$.ajax({
			type:"POST",
			url:"https://wsmtapi.aipokj.cn/v1/goods/list",
			dataType:"Json",
			async:true,
			data:{
				isHot:1,
			},
			success:function(data){
				$(".jiazai").css("display","none");
				var baokuan=data.data.isHot;
					for(var i=0;i<2;i++){
						$(".all2downbody").append(`<div class="al2left">
						<img class="al2fimg1" src="${baokuan[i].userHeader}" style="width: 0.4rem; height: 0.4rem;"/>
						<font class="al2font1">${baokuan[i].userTitle}</font>
						<font class="goodsid" style="display:none">${baokuan[i].goodsId}</font>
						<img class="al2fimg2" src="${baokuan[i].masterImg}" style="width: 2.88rem; height: 2.88rem;" />
						<font class="al2font2">${baokuan[i].goodsTitle.substring(0,10)}</font>
						<p class="al2p1" >补贴价<font>￥${baokuan[i].price}</font></p>
						<p class="al2p2">￥${baokuan[i].price}补贴</p>
					</div>`)
					}
					var abb=data.data.data;
					for(var i=0;i<3;i++){
						$("#all2").append(`
							<div class="all2down1">
								<div class="all2down1head">
									<img src="${abb[i].userHeader}" style="width: 0.8rem; height: 0.8rem; margin-top: 0.22rem; margin-left: 0.2rem;" />
									<font class="abidas">${abb[i].userTitle}</font>
									<p >仅剩：<font style="color: red;">${abb[i].stockNum}</font>件</p>
								</div>
								<div class="all2down1body">
									<img class="all2down1bodyimg" src="${abb[i].masterImg}" style="width: 2.4rem; height: 2.4rem;" />
									<div class="all2d1bright">
										<p class="all2bodyp1">${abb[i].userTitle}</p>
										<p class="nhgoodsID" style="display:none;">${abb[i].goodsId}</p>	
										<p class="all2bodyf1">￥${parseFloat(abb[i].price).toFixed(0)}<font style="font-size: 0.25rem; "> 补贴价</font></p>
										<font class="all2bodyf2">${parseFloat(abb[i].originalPrice).toFixed(0)}</font>
										<img class="all2d1brightimg" src="img/编组@2x.png" style="width: 3.46rem; height: 0.72rem;" />
										<p  class="all2bodyf3">补贴<br />￥${parseFloat(abb[i].price).toFixed(0)}</p>
										<p class="all2bodyf4"> 马上抢 ></p>
									</div>
								</div>
					</div>`)}
			}
		})
	
	
})
	
	$.getUrlParam = function (name) {
                 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                 var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
}