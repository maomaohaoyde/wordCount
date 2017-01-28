var freqMap={};
function minHeap()
{
	this.array=[];
}	
minHeap.prototype = {
	swap: function (a,b)
	{
		var temp1=this.array[a];
		this.array[a]=this.array[b];
		this.array[b]=temp1;
	},
	bubbleDown: function(pos)
	{
		var left = 2*pos + 1;
		var right = left + 1;
		var smaller = pos;
		
		if (left>24) {return;}
		if (freqMap[this.array[pos]]>freqMap[this.array[left]]) 
		{
			smaller = left;
		}
		
		if (right<=24 && freqMap[this.array[right]]<freqMap[this.array[smaller]]) 
		{
			smaller=right;
		}
		if (smaller != pos) {this.swap(smaller,pos);
			this.bubbleDown(smaller);}
	},
	bubbleUp: function (pos)
	{
		if (pos<=0) 
			return;
		var parent = Math.floor((pos-1)/2);
		//if current node is smaller than 
		if (freqMap[this.array[pos]]<freqMap[this.array[parent]])
		 {
		 	
		 	this.swap(pos,parent);
		 	this.bubbleUp(parent);
		 }
	},
	insert: function (a)
	{
		//first construct a min heap with 25 elements
		var i=this.array.length;
		if (i<25) {

			this.array[i]=a;
			this.bubbleUp(i);
		}
		//after 25th elements compare the frequency of the new word
		//if it is larger than the 25th largest frequency so far, 
		//replace this word with the old word and adjust the min heap
		else if (freqMap[a]>freqMap[this.array[0]]) 
		{
			
			this.array[0]=a;
			this.bubbleDown(0);
			
		}
	},
	result: function()
	{
		
		return this.array;
	}
	};

	

	



var Words;
var xhttp = new XMLHttpRequest();

 xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status===200 ) {
            Words = xhttp.responseText;
            var commonWords={"are":"are","is":"is","where":"where","was":"was"};
var trimmedWords = Words.match(/\b[a-z]+(?=\W{2}td\b)/g);
var trimmedLinks = Words.match(/\b[a-z]+(?=\W{2}a\W{3}td)/gi);
var length1 = trimmedWords.length;
var length2 = trimmedLinks.length;
for (var i = 0; i <length1; i++) {
	commonWords[trimmedWords[i]]=trimmedWords[i];
}
//some of the common words are links
for (var i = 0; i <length2; i++) {
	commonWords[trimmedLinks[i]]=trimmedLinks[i];
}

var longArray = $('*:visible:not(script)').contents().map(function () {
    if (this.nodeType == Node.TEXT_NODE ) 
        return this.nodeValue.match(/[a-z]{2,}/ig);  
}).get();


for (var i = longArray.length - 1; i >= 0; i--) {
	var temp=longArray[i].toLowerCase();
	//if the word is not in the forbidden list
	if (commonWords[temp]===undefined) {
    if (freqMap[temp]===undefined) 
    {
    	freqMap[temp] = 1;
    }
    else
    	freqMap[temp]++;
}
}

var newHeap=new minHeap();
for (var key in freqMap) {
    // skip loop if the property is from prototype
    if (!freqMap.hasOwnProperty(key)) continue;
    newHeap.insert(key);  
}
function htmlreplace(a, b, element) {    
    if (!element) element = document.body;
    var r = new RegExp("\\b"+a+"\\b", 'gi');    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}



var finalArray=newHeap.result();
for (var i = 0; i <25; i++) {
	var temp=finalArray[i];
	htmlreplace(temp,freqMap[temp]);
	
	
}

		
       }
    };
    xhttp.open("GET", "https\:\/\/en.wikipedia.org\/wiki\/Most_common_words_in_English", true);
    xhttp.send(); 