const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get Quotes From API

let apiQuotes = [];

function loading(){
	loader.hidden = false
	quoteContainer.hidden = true
}

function complete(){
	loader.hidden = true
	quoteContainer.hidden = false
}


function newQuote(){
	loading()
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
	// Check if author is blank
	if (!quote.author) {
		authorText.textContent = 'Unknown'
	}
	else {
		authorText.textContent = quote.author
	}

	if (quote.text.length > 150){
		quoteText.classList.add('long-quote')
	}
	else {
		quoteText.classList.remove('long-quote')
	}

	quoteText.textContent = quote.text
	complete()
}

async function getQuotes(){
	loading()
	const apiUrl = 'https://type.fit/api/quotes'
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote()
	} catch (error){
		// Error handling
		console.log(error)
	}
}

// Tweet quote
function tweetQuote(){
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	open(twitterUrl, '_blank')
}

// On Load
getQuotes()

// EventListeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)