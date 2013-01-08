enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{name: "ProgressAnimator",
		kind: "Animator",
		startValue: 0,
		endValue: 800,
		duration: 12000,
		easingFunction: enyo.easing.linear,
		onStep: "animatorStep"},
		
		{name: "ProgressPopup",
		floating: true,
		centered: true,
		kind: "onyx.Popup",
		style: "width: 50%",
		components:[
			{name: "ProgressTitle", content: "Analysing Heightmap Data..."},
			{name: "ProgressBar", kind: "onyx.ProgressBar", min: 0, max: 700},
		]},
		
		{kind: "onyx.Toolbar", content: "Cartographer"},
		{kind: "enyo.Scroller", fit: true, components: [
			{kind: "Image", src: "assets/map.png",
			style: "min-width: 100%;",
			onmousedown: "mousePress",
			ondrag: "mouseDragged",
			components:[
				{name: "SelectionOrb",
				kind: "Image",
				src: "assets/selection.png",
				style: "position: absolute; opacity: 0.4; -webkit-transform: scale(0.0);"},
			]}
		]},
		{kind: "onyx.Toolbar", components: [
			{content: "Click and drag to select an area"},
			{name: "GenerateButton",
			kind: "onyx.Button",
			style: "float: right;",
			content: "Generate",
			disabled: true,
			ontap: "generateTapped"}
		]},
	],
	mousePress: function(inSender, inEvent) {
		this.$.SelectionOrb.applyStyle("left", (inEvent.screenX - 256) + "px");
		this.$.SelectionOrb.applyStyle("top", (inEvent.screenY - 412) + "px");
		this.$.SelectionOrb.addStyles("-webkit-transform: scale(0.0);");
	},
	mouseDragged: function(inSender, inEvent) {
		enyo.log(inEvent);
		this.$.SelectionOrb.addStyles("-webkit-transform: scale(" + (Math.abs(inEvent.dx) + Math.abs(inEvent.dy)) * 0.003 + ");");
		
		if(this.$.GenerateButton.getDisabled())
			this.$.GenerateButton.setDisabled(false);
	},
	generateTapped: function() {
		this.$.ProgressPopup.show();
		this.$.ProgressAnimator.play();
	},
	animatorStep: function(inSender) {
		this.$.ProgressBar.setProgress(inSender.value);
		
		if(inSender.value >= 100)
			this.$.ProgressTitle.setContent("Smoothing Terrain...");
			
		if(inSender.value >= 200)
			this.$.ProgressTitle.setContent("Processing Vector Data: Applying Landscape Colour");
			
		if(inSender.value >= 220)
			this.$.ProgressTitle.setContent("Processing Vector Data: Transport Nodes");
			
		if(inSender.value >= 250)
			this.$.ProgressTitle.setContent("Processing Vector Data: Water Volumes");
			
		if(inSender.value >= 275)
			this.$.ProgressTitle.setContent("Processing Vector Data: Structural Volumes");
			
		if(inSender.value >= 300)
			this.$.ProgressTitle.setContent("Processing Image Data: Landscape Detail");
			
		if(inSender.value >= 350)
			this.$.ProgressTitle.setContent("Processing Image Data: Structural Detail");
			
		if(inSender.value >= 375)
			this.$.ProgressTitle.setContent("Processing Image Data: Estimating Structure Heights");
			
		if(inSender.value >= 430)
			this.$.ProgressTitle.setContent("Processing Image Data: Tree Location");
			
		if(inSender.value >= 460)
			this.$.ProgressTitle.setContent("Processing Image Data: Identifying Walls");
			
		if(inSender.value >= 500)
			this.$.ProgressTitle.setContent("Processing Street View Images: Supplementing Structure Heights");
			
		if(inSender.value >= 600)
			this.$.ProgressTitle.setContent("Processing Street View Images: Supplementing Structure Surfaces");
			
		if(inSender.value >= 700)
			this.$.ProgressTitle.setContent("Processing Complete");
			
		if(inSender.value >= 800)
			this.$.ProgressPopup.hide();
	}
});
