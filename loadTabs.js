window.onload = function() {
  chrome.tabs.query({}, function(tabs){

    var keies = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var windowIds = [];
    var keyAssigns = [];
    var elements = '';
    var tabsCount = tabs.length;
    var titleLimit = '';
    var tabElements = '';
    var tabBlockElements = '';
    var targetTabId = '';
    var targetWindowId = '';

    if(tabsCount > 50){
      titleLimit = 8;
      tabElementsWidth = '190px';
      tabBlockWidth = '160px';
    }else if(tabsCount <= 50 && tabsCount > 34){
      titleLimit = 16;
      tabElementsWidth = '260px';
      tabBlockWidth = '230px';
    }else if(tabsCount <= 34 && tabsCount > 17){
      titleLimit = 28;
      tabElementsWidth = '390px';
      tabBlockWidth = '360px';
    }else if(tabsCount <= 17 && tabsCount > 0){
      titleLimit = 58;
      tabElementsWidth = '790px';
      tabBlockWidth = '760px';
    }

    for(var i = 0; i < tabs.length; i++){
      if(i >= keies.length){
        break;
      }
      elements += '<div class="tab_element">';
      elements += '<div class="key">' + keies[i] + '</div>';
      elements += '<div class="tab_block">';
      elements += '<img src="' + tabs[i].favIconUrl + '" width="16" class="favicon" />';
      elements += '<span class="tab_title">' + tabs[i].title.substr(0, titleLimit) + '</span>';
      elements += '</div>';
      elements += '<div class="clear"></div>';
      elements += '</div>';
      keyAssigns[keies[i]] = tabs[i].id;
      windowIds[tabs[i].id] = tabs[i].windowId;
    }
    document.getElementById('tab_list').innerHTML = elements;

    tabElements = document.getElementsByClassName('tab_element');
    tabBlockElements = document.getElementsByClassName('tab_block');

    for(var i = 0; i < tabs.length; i++){
      if(i >= keies.length){
        break;
      }
      tabElements[i].style.width = tabElementsWidth;
      tabBlockElements[i].style.width = tabBlockWidth;
    }

    window.addEventListener('keydown', function(e){
      if(e.shiftKey){
        targetTabId = keyAssigns[String.fromCharCode(e.keyCode)];
      }else{
        targetTabId = keyAssigns[String.fromCharCode((e.keyCode)).toLowerCase()];
      }
      targetWindowId = windowIds[targetTabId];
      chrome.tabs.update(targetTabId, {selected: true});
      chrome.windows.update(targetWindowId, {focused: true});
    });
  });
}
