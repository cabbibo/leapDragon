

function BufferLoader(context,urlList,callback){
	this.context=context;
	this.urlList=urlList;
	this.onload=callback
	this.bufferList=new Array();
	this.loadCount=0;
	this.loadedUrls = []
}



BufferLoader.prototype.loadBuffer=function(url,index){
	var request=new XMLHttpRequest();
	request.open("GET",url,true);
	request.responseType="arraybuffer";
	var loader=this;
	
	request.onload=function(){
	
	
		//TODO:
		//Add load bar functionality, starting at the decoding of the audio	
	
		loader.context.decodeAudioData(
			request.response,
			function(buffer){
				if(!buffer){
					alert('error decoding file data: '+url);
					return;
				}
			loader.bufferList[index]=buffer;
			//console.log(loader)
			loader.loadedUrls.push(url)
			
			if(++loader.loadCount==loader.urlList.length)
				
				loader.onload(loader.bufferList);
			}
		);
		
		
		
	}
	
	request.onerror=function(){
		alert('BufferLoader: XHR error');
	}
	request.send();
}

BufferLoader.prototype.load=function(){
	for(var i=0;i<this.urlList.length;++i)
		this.loadBuffer(this.urlList[i],i);
}