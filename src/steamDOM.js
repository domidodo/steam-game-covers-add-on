class SteamDOM {

	static createAndAddDOM(coverArray)
	{
		var elem = document.getElementById("steamgamecover");
		if(elem !== null)
		{
			elem.parentNode.removeChild(elem);
		}
		
		var sectionNode = SteamDOM.createElement("div", {"id":"steamgamecover", "classes": "game_area_cover_section","display":true});
		
		var panel = SteamDOM.createBody(coverArray);
		
		sectionNode.appendChild(SteamDOM.createHeader());
		sectionNode.appendChild(panel);
		sectionNode.appendChild(SteamDOM.createScrollBar(panel));
		
		document.getElementById("game_area_purchase").appendChild(sectionNode);
	}
	
	static createHeader()
	{
		var topic = SteamDOM.createElement("h2", {"classes":"gradientbg", "innerHTML": "Cover"});
		var topicButton = SteamDOM.createElement("span", {"classes":"note"});
		var topicButtonLink = SteamDOM.createElement('a', {"href":"http://www.steamgamecovers.com/", "innerHTML":"Steamgamecovers.com"});
		
		topicButton.appendChild(topicButtonLink);
		topic.appendChild(topicButton);
		
		return topic;
	}
	
	static createBody(coverArray)
	{
		var body = SteamDOM.createElement('div', {"classes":"store_horizontal_autoslider_ctn", "height": 200, "paddingTop": 5});
		
		var innerScrollPanel = SteamDOM.createElement('div', {"id":"steamgamecover_block_content", "classes": "block_responsive_horizontal_scroll store_horizontal_autoslider block_content nopad", "overflowX": "scroll"});
		
		for(var i = 0; i < coverArray.length; i++)
		{
			var coverData = coverArray[i];
			
			var cover = SteamDOM.createElement('a', {"classes":"small_cap app_impression_tracked", "href": coverData.url });
			cover.setAttribute("onmouseenter", "GameHover( this, event, 'global_hover', {type:'app', id:'steamgamecover_"+coverData.id+"', v6:1} );");
			cover.setAttribute("onmouseleave", "HideGameHover( this, event, 'global_hover' )");
			SteamDOM.crateHoverContent(coverData);
			
			var coverImage = SteamDOM.createElement('img', {"classes": "coverimage", "src": coverData.large_image, "height" : 132});
			
			
			var coverRanking = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/"+coverData.rating.value.replace(".", "")+"star.png")});
			
			//var coverDownloadCount = document.createElement('h4');
			//coverDownloadCount.innerHTML = 'Downloads: '+data.downloads;
			//cover.appendChild(coverDownloadCount)
			
			var coverArtist = SteamDOM.createElement('h5', {"innerHTML": TextPool.getString("CreatedBy") +': '+coverData.creator.name});
			
			
			cover.appendChild(coverImage);
			cover.appendChild(coverRanking);
			cover.appendChild(coverArtist);
			
			
			innerScrollPanel.appendChild(cover)	
		}
		
		body.appendChild(innerScrollPanel);
		
		return body;
	}
	
	static createScrollBar(panel){
		
		var scrollBar = SteamDOM.createElement('div', {"id":"steamgamecoverScrollBar", "classes": "slider_ctn store_autoslider", "display": false});
		
		var btnLeft  = SteamDOM.createElement('div', {"classes": "slider_left", "innerHTML": "<span></span>"});
			
		var btnRight  = SteamDOM.createElement('div', {"classes": "slider_right", "innerHTML": "<span></span>"});
		
		var sliederBackground  = SteamDOM.createElement('div', {"classes": "slider_bg"});
			
		var sliederPanel  = SteamDOM.createElement('div', {"classes": "slider"});
			
		var slieder  = SteamDOM.createElement('div', {"classes": "handle", "position": "absolute"});
		
				
		sliederPanel.appendChild(slieder);
			
		scrollBar.appendChild(btnLeft);
		scrollBar.appendChild(btnRight);
		scrollBar.appendChild(sliederBackground);
		scrollBar.appendChild(sliederPanel);
		
		
		var controller = new SteamScrollBarController(panel, function(isUsed){
			if(isUsed)
				scrollBar.style.display = "block";
			else
				scrollBar.style.display = "none";
		});
		controller.addSlieder(sliederPanel, slieder);
		controller.addButtonLeft(btnLeft);
		controller.addButtonRight(btnRight);
		

		return scrollBar;
	}
	
	
	static crateHoverContent(coverData)
	{
		var languageImage = SteamDOM.createElement('img', {"classes":"cover_language_flag", "src": chrome.runtime.getURL("img/flag_"+coverData.language+".png")});
		
		var hoverContent = SteamDOM.createElement('div', {"id":"hover_app_steamgamecover_"+coverData.id, "display": false});
		
		var topArea = SteamDOM.createElement('div', {"classes":"hover_top_area", "display": false});
		
		var title = SteamDOM.createElement('h4', {"innerHTML": coverData.type.substring(0, coverData.type.length-1).replace(/_/g, " ").toUpperCase()});
		
		var creator = SteamDOM.createElement('div', {"classes":"hover_release", "innerHTML": TextPool.getString("CreatedBy") + ": "+coverData.creator.name});
		var release = SteamDOM.createElement('div', {"classes":"hover_release", "innerHTML": TextPool.getString("Release") + ": "+new Date(coverData.date_posted).toLocaleString(TextPool.getLanguageFormCode())});
		
		var coverImageArea = SteamDOM.createElement('div', {"classes":"hover_screenshots"});
		var coverImage = SteamDOM.createElement('div', {"classes":"hover_coverimage", "backgroundImageUrl": coverData.large_image});
		coverImageArea.appendChild(coverImage);
	
	
		var ratingAreaDownloadsCountClass = " no_reviews";
		if(coverData.downloads >= 1 && coverData.downloads <= 10)
			ratingAreaDownloadsCountClass = "";
		if(coverData.downloads >= 11 && coverData.downloads <= 100)
			ratingAreaDownloadsCountClass = " mixed";
		if(coverData.downloads >= 101)
			ratingAreaDownloadsCountClass = " positive";
		
		var ratingArea = SteamDOM.createElement('div', {"classes":"hover_body"});
		var ratingAreaBody = SteamDOM.createElement('div', {"classes":"hover_review_summary"});
		var ratingAreaStars = SteamDOM.createElement('img', {"src": chrome.runtime.getURL("img/"+coverData.rating.value.replace(".", "")+"star.png")});
		var ratingAreaDownloadsText = SteamDOM.createElement('span', {"innerHTML":" "+TextPool.getString("Downloads")});
		var ratingAreaDownloadsCount = SteamDOM.createElement('span', {"classes": "game_review_summary"+ratingAreaDownloadsCountClass, "innerHTML": "<br/>"+coverData.downloads});
		var ratingAreaBottom = SteamDOM.createElement('div', {"clear":"left"});
		ratingAreaBody.appendChild(ratingAreaStars);
		ratingAreaBody.appendChild(ratingAreaDownloadsCount);
		ratingAreaBody.appendChild(ratingAreaDownloadsText);
		ratingArea.appendChild(ratingAreaBody);
		ratingArea.appendChild(ratingAreaBottom);
		
		var description = null;
		if(coverData.description != "")
		{
			description = SteamDOM.createElement('p', {"innerHTML":"<b>"+TextPool.getString("Description")+":</b><br/>"+coverData.description});
		}
		
		var tagsArea = SteamDOM.createElement('div', {"classes":"hover_body"});
		var tagsAreaBody = SteamDOM.createElement('div', {"classes":"hover_tag_row"});
		tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.language}));
		if(coverData.disc_number != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":"Disc "+coverData.disc_number}));
		if(coverData.case_type != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.case_type}));
		if(coverData.cover_location != null)
			tagsAreaBody.appendChild(SteamDOM.createElement('div', {"classes":"app_tag", "innerHTML":coverData.cover_location}));
		tagsArea.appendChild(tagsAreaBody);
		
		
		hoverContent.appendChild(languageImage);
		hoverContent.appendChild(topArea);
		hoverContent.appendChild(title);
		hoverContent.appendChild(release);
		hoverContent.appendChild(creator);
		hoverContent.appendChild(coverImageArea);
		hoverContent.appendChild(ratingArea);
		if(description != null){
			hoverContent.appendChild(description);
		}
		hoverContent.appendChild(tagsArea);
		
		document.getElementById("global_hover_content").appendChild(hoverContent);
		
		/*
		<div id="hover_app_steamgamecover_000" style="display: none;">
			<div class="hover_top_area" style="display: none;">
			</div>
			<h4>Cities: Skylines - Green Cities</h4>
			<div class="hover_release"> Veröffentlicht: 19. Okt. 2017 </div>

			<div class="hover_screenshots">
				<div class="screenshot" style="background-image: url( https://steamcdn-a.akamaihd.net/steam/apps/614580/ss_d26eb29586517e5da561cfa30645f1cfbdbf168e.600x338.jpg?t=1516968393  )"></div>
				<div class="screenshot" style="background-image: url( https://steamcdn-a.akamaihd.net/steam/apps/614580/ss_2b3c844c18eb967c6342eed9253b70852a7c6113.600x338.jpg?t=1516968393  )"></div>
				<div class="screenshot" style="background-image: url( https://steamcdn-a.akamaihd.net/steam/apps/614580/ss_4b817962e3c8db7597624b8936142b298e6a36cf.600x338.jpg?t=1516968393  )"></div>
				<div class="screenshot" style="background-image: url( https://steamcdn-a.akamaihd.net/steam/apps/614580/ss_b734834fa0d239e6ca350990c8090745801f93f7.600x338.jpg?t=1516968393  )"></div>
			</div>

			<div class="hover_body">
				<div class="hover_review_summary">
					<div class="title">Gesamte Nutzerreviews:</div>
					<span class="game_review_summary positive">Größtenteils positiv</span> (206 Reviews)
				</div>
				<div style="clear: left;"></div>
			</div>
			<div class="hover_body">
				Nutzer-Tags:
				<div class="hover_tag_row">
					<div class="app_tag">Simulation</div>
					<div class="app_tag">Strategie</div>
					<div class="app_tag">Aufbaustrategie</div>
				</div>
			</div>
			<div class="rule"></div>
			<div class="hover_body_block"><span>1 Freund</span> wünscht sich dieses Spiel:</div>
			<div class="friend_blocks_row hover_friends_blocks">
				<div class="playerAvatar offline">
					<img id="friend_avatar_img_46357337" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4d/4d4f577ee0e85df4735c8eed24c4577352afa9e7.jpg">
				</div>
				<div style="clear: left;"></div>
			</div>
		</div>
		*/
	}
	
	
	/*
	data = {
		"id" - string
		"classes" - string
		"display" - boolean
		"height" - int
		"width" - int
		"padding" - int
		"paddingTop" - int
		"paddingRight" - int
		"paddingBottom" - int
		"paddingLeft" - int
		"overflowX" - string
		"overflowY" - string
		"backgroundImageUrl" - string
		"href" - string
		"src" - string
		"innerHTML" - string
		"position" - string
		"clear" - string
	}
	*/
	static createElement(type, data)
	{
		var obj = document.createElement(type);
		
		if(data.id != null)
			obj.id = data.id;
		
		if(data.classes != null)
			obj.className = data.classes;
		
		if(data.display != null)
			if(data.display)
				obj.style.display = "block";
			else
				obj.style.display = "none";
		
		if(data.height != null)
			obj.style.height = data.height+"px";
		
		if(data.width != null)
			obj.style.width = data.width+"px";
		
		if(data.padding != null)
			obj.style.padding = data.padding+"px";
		
		if(data.paddingTop != null)
			obj.style.paddingTop = data.paddingTop+"px";
		
		if(data.paddingRight != null)
			obj.style.paddingRight = data.paddingRight+"px";
		
		if(data.paddingBottom != null)
			obj.style.paddingBottom = data.paddingBottom+"px";
		
		if(data.paddingLeft != null)
			obj.style.paddingLeft = data.paddingLeft+"px";
		
		if(data.overflowX != null)
			obj.style.overflowX = data.overflowX+"px";
		
		if(data.overflowY != null)
			obj.style.overflowY = data.overflowY+"px";
		
		if(data.position != null)
			obj.style.position = data.position;
		
		if(data.clear != null)
			obj.style.clear = data.clear;
		
		if(data.backgroundImageUrl != null)
			obj.style.backgroundImage = "url('"+data.backgroundImageUrl+"')";
		
		if(data.href != null)
			obj.setAttribute("href", data.href);
		
		if(type == "a")
		{
			obj.setAttribute("target", "_blank");
			obj.setAttribute("rel", "noopener");
		}
		
		if(data.src != null)
			obj.setAttribute("src", data.src);
		
		
		if(data.innerHTML != null)
			obj.innerHTML = data.innerHTML;
		
		
		return obj;
	}

}
//alert(JSON.stringify(coverArray));