/* global $ */

$(document).ready(function () {
  // Fetch random article from the API
  $('#randomArticleBtn').on('click', function () {
    const RANDOM_ARTICLE_URL = 'https://en.wikipedia.org/wiki/Special:Random'
    window.open(RANDOM_ARTICLE_URL)
  })
  // API call if search button is clicked
  $('#searchBtn').on('click', function () {
    let searchInput = $('#searchInput').val()
    let searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=
    ${searchInput}&format=json&callback=?`
    $.getJSON(searchUrl).done(displayResults).fail(function (e) {
      $('#searchResults').html('There was a problem retrieving your search. Try again.')
    })
  })
  // API call if enter is pressed in the input box
  $('#searchInput').keypress(function (event) {
    if (event.keyCode === 13) {
      $('#searchBtn').click()
    }
  })
})

function displayResults (apiResults) {
  let $results = $('#searchResults')
  $results.html('')  // Clear previous results
  // Display "No results" if search term(s) do not match any available entries
  if (apiResults[1].length === 0) {
    $results.append('<div class="results-list">No results</div>')
    return
  }
  // Populate the list with search results
  for (let i = 0; i < apiResults[1].length; i++) {
    $results.append('<li class="results-list"><div class="article-heading">' +
    '<a class="article-link" href=' + apiResults[3][i] + '>' + apiResults[1][i] +
    '</a></div><p>' + apiResults[2][i] + '</p></li>')
  }
}
