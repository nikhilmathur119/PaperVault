//searchbar
function search() {
    var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    var content = document.getElementById('content');
    var paragraphs = content.getElementsByTagName('p');
    var thumbnails = document.getElementsByClassName('thumbnail');
    var pdfs= document.getElementsByClassName('pdf');
    var box = document.getElementById('box');
    // Reset display for paragraphs and thumbnails
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.display = 'none';
        paragraphs[i].parentNode.style.border='hidden';
    }
    for (var j = 0; j < thumbnails.length; j++) {
        thumbnails[j].style.display = 'none';
    }

    // Search and display matching paragraphs and thumbnails
    for (var i = 0; i < paragraphs.length; i++) {
        var paragraphText2 = paragraphs[i].textContent;
        var paragraphText = paragraphs[i].textContent.toLowerCase();
    
        if (paragraphText.includes(searchTerm)) {
            paragraphText2.display='flex';
            paragraphText2.justifyContent='space-around';
            paragraphs[i].style.display = 'initial'; // Show paragraph
            paragraphs[i].parentNode.style.border='solid';
            //dont entirely understand how to make sure that the divs are properly separated
            var parentDiv = paragraphs[i].parentNode;
            if (parentDiv.classList.contains('pdf'))
            {
                var thumbnail = parentDiv.querySelector('.thumbnail');
                if (thumbnail) 
                {
                    thumbnail.style.display = 'initial'; //thumbnail is displayed
                    parentDiv.parentNode.style.display='inline-flex';
                    parentDiv.parentNode.style.justifyContent='space-evenly';
                    parentDiv.parentNode.style.textAlign='center';
                    parentDiv.parentNode.style.justifyContent='space-evenly';
                    parentDiv.parentNode.parentNode.style.display='inline-flex';
                    parentDiv.parentNode.parentNode.style.justifyContent='space-evenly';
                }
            }
        }
    }
}

function reset()
{
    document.getElementById('searchInput').value='';
    document.getElementById('filtersOptions').value='all'
    var pdfDivs = content.getElementsByClassName('pdf');
    for (var i = 0; i < pdfDivs.length; i++) {
        pdfDivs[i].style.display = 'flex';
        pdfDivs[i].style.textAlign='center'
    }
    search()
}

//constantly searches into the search input field
document.getElementById('searchInput').addEventListener('input', function() {
    // Call the search function whenever the input value changes
    search();
});


// open popup
function openModal(url) {
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("iframe");
    document.body.style.overflowY='hidden';
    iframe.src = url;
    modal.style.display = "block";
    //event listener to close popup when clicking outside of it
    window.addEventListener("click", outsideModalClick);
}

// close popup
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    //remove event listener
    window.removeEventListener("click", outsideModalClick);
}

//handles click outside of modal
function outsideModalClick(event) 
{
    var modal = document.getElementById("myModal");
    document.body.style.overflowY='visible';
    if (event.target == modal) 
    {
        modal.style.display = "none";
        window.removeEventListener("click", outsideModalClick);
    }
}



function filterByaCategory() 
{
    search()
    var filterOption = document.getElementById('filtersOptions').value;
    var content = document.getElementById('content');
    var pdfDivs = content.getElementsByClassName('pdf');
  
    // Reset display for pdfDivs and their child paragraphs/thumbnails
    for (var i = 0; i < pdfDivs.length; i++) 
    {
        pdfDivs[i].style.display = 'none';
    }
  
    // Filter and display pdfDivs based on the selected category
    if (filterOption === 'all') 
    {
        // If "All Categories" is selected, display all pdfDivs
        for (var i = 0; i < pdfDivs.length; i++) 
        {
            pdfDivs[i].style.display = 'inline-flex';
            pdfDivs[i].style.justifyContent='space-evenly'
            pdfDivs[i].style.textAlign='center'
        }
    } 
    else 
    {
        // Display pdfDivs with the selected category
        for (var i = 0; i < pdfDivs.length; i++) {
            if (pdfDivs[i].classList.contains(filterOption)) 
            {
                pdfDivs[i].style.display = 'flex';
            }
        }
    }
}

//this is to change the color based on what hour,day,month it is
function bodycolour()
{
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var hour = currentDate.getHours();
    var hour_red=mapValue(hour,0,23,0,255)
    var hour_green=mapValue(hour,0,23,0,255)
    var hour_blue=mapValue(hour,0,23,0,255)
    var red = mapValue(day, 1, 31, 0, 255); //mapped day to red
    var green = mapValue(month, 1, 12, 0, 255); // map month to green
    var blue = mapValue(hour, 0, 23, 0, 255); //map hour to blue
    
    var col = document.getElementById("colour");
    //create RGB
    var color = "rgb(" + red + "," + green + "," + blue + ")";
    col.style.backgroundColor = color;
    
    var oppositeColor = "rgb(" + (255 - red) + "," + (255 - green) + "," + (255 - blue) + ")";
    col.style.boxShadow='0px 10px 10px 10px oppositeColor inset';
    
    // Set the text color of the paragraph to the opposite color
    var cols = document.getElementById("oppcolour");
    cols.style.backgroundColor = oppositeColor;


    var signedElements = document.getElementsByClassName('signed');
    for (var i = 0; i < signedElements.length; i++) {
        signedElements[i].style.color = color;
    }

    // Change font color for elements with class "paragraphed"
    var paragraphedElements = document.getElementsByClassName('paragraphed');
    for (var i = 0; i < paragraphedElements.length; i++) {
        paragraphedElements[i].style.color = oppositeColor;
    }
}

function mapValue(value, fromMin, fromMax, toMin, toMax) {
    return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
}

setInterval(bodycolour, 100);
/*
function load() {
    document.body.style.overflowY = 'visible';
    var left = document.getElementById('colour');
    var right = document.getElementById('oppcolour');
    var para = document.getElementById('paragraph');

    // Apply transition property to animate the divs
    left.style.transition = 'transform 1s ease';
    right.style.transition = 'transform 1s ease';
    para.style.transition = 'transform 1s ease';

    // Move the divs up by setting the transform property
    left.style.transform = 'translateY(-100%)';
    right.style.transform = 'translateY(-100%)';
    para.style.transform = 'translateY(-100%)';

    // Set a timeout to hide the divs after the animation completes
    setTimeout(function() {
        left.style.display = 'none';
        right.style.display = 'none';
        para.style.display = 'none';
    }, 1000); // 2000 milliseconds = 2 seconds (duration of animation)
}
*/

// Add event listener for scroll event on overlay
/*
var overlay = document.querySelector('.overlay');
overlay.addEventListener('scroll', scrolled);

function scrolled()
{
    load();
}
*/
function load() 
{
    document.body.style.overflowY = 'visible';
    var overlay = document.querySelector('.overlay');
    // Apply transition property to animate the overlay
    overlay.style.transition = 'transform 1s ease';

    // Move the overlay up by setting the transform property
    overlay.style.transform = 'translateY(-100vh)';

    // Set a timeout to hide the overlay after the animation completes
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 2000); // 2000 milliseconds = 2 seconds (duration of animation)
}
