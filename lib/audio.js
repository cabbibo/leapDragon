
var musicContext = new webkitAudioContext();	
 
var masterGain = musicContext.createGainNode();

var masterAnalyser = musicContext.createAnalyser();



masterGain.gain.value =.8

masterGain.connect(masterAnalyser)
masterAnalyser.connect(musicContext.destination)

		

		
function AUDIO(whichSoundObj,file,buffer,looped){

	//this.fileArray=[]
	this.file=file
	this.buffer = buffer
	
	//Set the Solar System that the song belongs to
	this.whichSoundObj = whichSoundObj
	
	
	//gets just the track name, removing the mp3
	this.trackID= file.split('.')[file.split('.').length-2];
	this.playing = false
	
	
	this.createSource(looped); 
}
		
		


AUDIO.prototype = {
	
	playing:false,
	stop:function(){
		this.playing = false
		this.source.noteOff(0);
	},
		
	play:function(){
		
		this.playing = true
		this.source.noteOn(0);
		var self = this
		
		if(this.source.loop == false){
			 this.createSource()	
		}
	},
			
	update:function(){
		if(this.playing ==true){
			this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount)
			this.analyser.getByteFrequencyData(this.freqByteData)
			
			if(this.whichSoundObj.visualize){
				for(var i=0;i<this.analyser.frequencyBinCount;i++){
					if(this.whichSoundObj.visualize){
						this.whichSoundObj.visualize(this.freqByteData[i],this.analyser.frequencyBinCount,i);
					}
				}
			}else{
				
			}
		}else{
		
		}
		
	
	},
	
	
	
	createSource: function(looped) {
		this.source = musicContext.createBufferSource();
		this.source.buffer = this.buffer;
				
		// Create a gain node.
		this.gainNode =  musicContext.createGainNode();
		
		this.gainNode.gain.value = 0;
			
		//this.panner = context.createPanner();
				
		this.analyser = musicContext.createAnalyser();
		this.analyser.fftSize = 128;
		
		
		
				
		//loops the source. 
		if(looped){
			this.source.loop=true;
		}else{
			this.source.loop=false;
		}
				
		// Connect source to gain.
		this.source.connect(this.gainNode);
				
		//Connects source to analyser
		this.gainNode.connect(this.analyser);
	
				
		//Connect Analyser to destination
		this.analyser.connect(masterGain);
			
	},
	
	destroySource:function(){
		this.analyser.disconnect(this.gainNode)
		this.gainNode.disconnect(this.analyser)
		console.log('destroyed')
		this.source = undefined
		this.gainNode = undefined
		this.analyser = undefined
	},
	
}



