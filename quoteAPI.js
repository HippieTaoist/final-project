function rando(num) {
    return Math.floor(Math.random() * num)
}

//quoteAPI
async function quoteAPI() {
    let rawData = await fetch('https://api.quotable.io/quotes')
    let data = await rawData.json()
    // console.log(data)
    let randoPage = rando(data.totalPages)

    let rawData2 = await fetch(`https://api.quotable.io/quotes?page=${randoPage}`)
    let data2 = await (rawData2.json())
    // console.log(data2)


    let randoQuote = rando(data.results.length)
    // console.log(randoQuote)


    let quote = data2.results[randoQuote].content
    // console.log('quoteArray', quote)

    quoteAPIDiv.innerText = quote

}
quoteAPI();