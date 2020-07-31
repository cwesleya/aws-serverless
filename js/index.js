const routeTo = (text) => {
  const name = text === '/' ? 'home' : text.toLowerCase()
  const views = document.getElementsByClassName('view')
  const route = text === '/' ? '' : `#${name}`
  const origin = window.location.origin
  const newUrl = `${origin}${route}`

  for (let i = 0; i < views.length; i++) {
    let view = views[i]
    let match = view['id'] === name

    view.style.display = match ? '' : 'none'
  }

  history.pushState({}, '', newUrl)
  window.location.href = newUrl
}

window.addEventListener('hashchange', (e) => {
  const destination = e.target.
    location.hash.slice(1).toLowerCase()

  switch (destination) {
    case 'about':
      routeTo('about')
      break
    case 'contact':
      routeTo('contact')
      break
    case 'home':
      routeTo('home')
      break
    default:
      routeTo('/')
  }
})

const getBooks = () => {
  return [
      {
          'id': 1,
          'author': 'Jacques Barzun',
          'title': 'From Dawn to Decadence: 1500 to the Present - 500 Years of Western Cultural Life',
          'published': 'May 15, 2001',
          'publisher': 'Harper Collins',
          'genre(s)': 'history'
      },
      {
          'id': 2,
          'author': 'Fyodor Dostoevsky',
          'title': 'Crime and Punishment',
          'published': '1866',
          'publisher': 'Bantom Classics',
          'genre(s)': 'fiction'
      },
      {
          'id': 3,
          'author': 'Paul Johnson',
          'title': 'A History of the American People',
          'published': 'February 17, 1999',
          'publisher': 'Harper Perennial',
          'genre(s)': 'history'
      },
      {
          'id': 4,
          'author': 'Louisa May Alcott',
          'title': 'Little Women',
          'published': '1868',
          'publisher': 'Penguin Classics',
          'genre(s)': 'fiction'
      },
      {
          'id': 5,
          'author': 'Frederick Douglass',
          'title': 'Narrative of the Life of Frederick Douglass',
          'published': 'May 1, 1845',
          'publisher': 'Yale University Press',
          'genre(s)': 'biography'
      },
      {
          'id': 6,
          'author': 'Edmund Burke',
          'title': 'Reflections on the Revolution in France',
          'published': 'November, 1790',
          'publisher': 'Oxford Classics',
          'genre(s)': 'political thought, philosophy'
      }
   ]
}

const buildTable = (columns = [], books = []) => {
  const displayColumns = columns
    .map(col => `${col[0].toUpperCase()}${col.slice(1)}`)
  let table = document.getElementById('booksTable')
  let tableHead = table.getElementsByTagName('thead')[0]
  let tableBody = table.getElementsByTagName('tbody')[0]
  let headerRow = document.createElement('tr')

  headerRow.setAttribute('class', 'column')

  displayColumns.forEach((col, i) => {
    let headerCell = document.createElement('th')
    headerCell.setAttribute('id', col)
    headerCell.setAttribute('class', 'headerCell')
    headerCell.innerHTML = col

    headerRow.append(headerCell)
  })

  tableHead.append(headerRow)

  books.forEach((book, i) => {
    let bodyRow = document.createElement('tr')
    let columnIndex = 0

    book['published'] = parseDate(new Date(book['published']))

    for (let key in book) {
      let bodyCell = document.createElement('td')
      bodyCell.setAttribute('id', book.title)
      bodyCell.setAttribute('class', 'bodyCell')
      bodyCell.innerHTML = book[columns[columnIndex++]]
      bodyRow.append(bodyCell)
    }

    tableBody.append(bodyRow)
  })
}

const filterBooks = (inputField, tableName) => {
  let filter = document
    .getElementById(inputField).value
  let tr = document
    .getElementById(tableName)
    .getElementsByTagName('tr')

  //start at 1 to skip the header row
  for (let i = 1; i < tr.length; i++) {
    let row = tr[i]
    let td = tr[i].getElementsByTagName('td')
    let contains = false;

    if (td && td.length) {
      for (let j = 0; j < td.length; j++) {
        let text = getHtmlText(td[j])

        if (text.indexOf(filter) > -1) {
          contains = true
          break
        }
      }
    }

    row.style.display = contains ? '' : 'none'
  }
}

const getHtmlText = (cell) => {
  return cell.textContent || cell.innerText || cell.innerHTML
}

const parseDate = (date) => {
  return date.getUTCFullYear()
}

const addEventListeners = () => {
  document
    .getElementById('filter-input')
    .addEventListener('keyup', () => {
      filterBooks('filter-input', 'booksTable')
    })

  const elements = document
    .getElementsByClassName('main-navbar')

  for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(
        'click',
        () => {
          routeTo(elements[i].innerHTML)
        }
      )
  }
}

(function () {
  const books = getBooks()
  const columns = Object.keys(books[0])

  buildTable(columns, books)
  addEventListeners()
})()
