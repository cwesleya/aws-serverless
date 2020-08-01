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

//cols, rows, caption, div-id
function dataTable(name) {
  this.tableName = name

  this.table = document.getElementById(this.tableName)

  this.tableHead = this.table.getElementsByTagName('thead')[0]

  this.tableBody = this.table.getElementsByTagName('tbody')[0]

  this.bodyRows = []

  this.addHeaders = (columns) => {
    let headerRow = document.createElement('tr')
    headerRow.setAttribute('class', 'column')

    columns.forEach((col, i) => {
      let headerCell = document.createElement('th')
      headerCell.setAttribute('id', col)
      headerCell.setAttribute('class', 'headerCell')
      headerCell.setAttribute('sort', 'asc')
      headerCell.innerHTML = col

      headerRow.append(headerCell)
    })

    this.tableHead.append(headerRow)
  }

  // this.tableHeaderCells = this.table
  //   .getElementsByTagName('thead')[0]
  //   .querySelectorAll('tr')

  this.addBodyRows = (data) => {
    data.items.forEach((item, i) => {
      let bodyRow = document.createElement('tr')
      let columnIndex = 0

      if (data.dateKey && data.parseDate) {
        item[data.dateKey] = data.parseDate(new Date(item[data.dateKey]))
      }

      for (let key in item) {
        let bodyCell = document.createElement('td')
        bodyCell.setAttribute('id', item[data.bodyCellId])
        bodyCell.setAttribute('class', 'bodyCell')
        bodyCell.innerHTML = item[data.columns[columnIndex++]]
        bodyRow.append(bodyCell)
      }

      this.tableBody.append(bodyRow)
      this.bodyRows.push(bodyRow)
    })
  }

  this.addEventListeners = () => {
    document
      .getElementById(this.tableName)
      .querySelectorAll('th')
      .forEach((th, position) => {
        th.addEventListener(`click`, evt => {
          // console.log(th)
          // console.log(this.tableHeaderCells)
          this.sortRows(position + 1)
        })
      })
  }

  this.build = (data) => {
    const displayColumns = data.columns
      .map(col => `${col[0].toUpperCase()}${col.slice(1)}`)

    this.addHeaders(displayColumns)

    this.addBodyRows(data)

    document
      .getElementsByClassName('loader')[0]
      .style.display = 'none'

    document
      .getElementById('home')
      .style.display = ''

    this.addEventListeners()
  }

  this.filter = (inputField, tableName) => {
    let filter = document
      .getElementById(inputField)
      .value
      .toLowerCase()
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
            .toLowerCase()

          if (text.indexOf(filter) > -1) {
            contains = true
            break
          }
        }
      }

      row.style.display = contains ? '' : 'none'
    }
  }

  this.sortRows = (column) => {
    //const compareValues = (a, b) => a > b ? -1 : a < b ? 1 : 0; desc
    const compareValues = (a, b) => a < b ? -1 : a > b ? 1 : 0;

    let qs = `td:nth-child(${column})`

    this.bodyRows
      .sort((r1,r2) => {
        // get each row's relevant column
        let t1 = r1.querySelector(qs)
        let t2 = r2.querySelector(qs)

        // and then effect sorting by comparing their content:

        return compareValues(
          parseIntIfNum(t1.textContent),
          parseIntIfNum(t2.textContent)
        )
    })

    this.bodyRows.forEach(row => this.table.appendChild(row))
  }
}

const parseIntIfNum = (n) => {
  if (isNaN(n)) {
    return n
  }

  return parseInt(n)
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
      },
      {
          'id': 7,
          'author': 'Aleksandr Solzhenitsyn',
          'title': 'The Gulag Archipelago, 1918-1956: An Experiment in Literary Investigation',
          'published': '1973',
          'publisher': 'Vintage UK',
          'genre(s)': 'political thought, biography'
      },
      {
          'id': 8,
          'author': 'Saint Thomas Aquinas',
          'title': 'The Summa Theologica of St. Thomas Aquinas (Five Volumes)',
          'published': '1485',
          'publisher': 'English Dominican Province Translation Edition',
          'genre(s)': 'theology, philosphy'
      },
      {
          'id': 9,
          'author': 'C. S. Lewis',
          'title': 'Mere Christianity',
          'published': '1952',
          'publisher': 'Signature Classics',
          'genre(s)': 'theology, philosphy, cultural criticism, psychology'
      },
      {
          'id': 10,
          'author': 'Saint John Henry Newman',
          'title': 'The Idea of a University',
          'published': '1485',
          'publisher': 'University of Notre Dame Press',
          'genre(s)': 'cultural criticism, history, philosphy, education'
      }
   ]
}

const getHtmlText = (cell) => {
  return cell.textContent || cell.innerText || cell.innerHTML
}

const addEventListeners = () => {
  document
    .getElementById('filter-input')
    .addEventListener('keyup', () => {
      booksTable.filter('filter-input', 'booksTable')
    })

  const elements = document
    .getElementsByClassName('main-navbar')

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', () => {
      routeTo(elements[i].innerHTML)
    })
  }
}

const booksTable = new dataTable('booksTable');

addEventListeners()

setTimeout(() => {
  const books = getBooks()

  books.forEach((book) => {
    book['genre(s)'] = book['genre(s)']
      .split(', ')
      .sort()
      .join(', ')
  })

  booksTable.build({
    columns: Object.keys(books[0]),
    items: books,
    dateKey: 'published',
    parseDate: (date) => {
      return date.getUTCFullYear()
    },
    bodyCellId: 'title'
  })
  addEventListeners()
}, 3000)
