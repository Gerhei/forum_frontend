const DOMAIN = window.location.protocol + '//' + window.location.host

const rootSectionsUrl = `${DOMAIN}/api/section`

function createSectionHTML(name, slug) {
  return `<tr>
            <td><a href="/${slug}" class="nav-link">${name}</a></td>
          </tr>`
}

function createTopicHTML(name, slug, author, createdAt) {
  return `<tr>
            <td><a href="/topic/${slug}" class="nav-link">${name}</a></td>
            <td>${author}</td>
            <td>${createdAt}</td>
          </tr>`
}

function createContentListHTML(id, title, headers=[]) {
  theaders = ''
  for (header of headers) {
    theaders += `<th>${header}</th>`
  }
  return `<section class="${id}-list">
            <div class="content__title">
              <h2>${title}</h2>
            </div>
            <table class="content__table">
              <thead class="content__title">${theaders}</thead>
              <tbody id="${id}">
              </tbody>
            </table>
        </section>`
}

async function getSectionsPage() {
  main = document.getElementById('main')

  isRoot = window.location.pathname == '/'

  sectionsUrl = isRoot ? rootSectionsUrl : rootSectionsUrl + window.location.pathname
  sectionsJson = await fetch(sectionsUrl).then(response => response.json())

  sectionList = isRoot ? sectionsJson.sections : sectionsJson.children
  if (sectionList.length > 0) {
    sectionsHTML = createContentListHTML('sections', 'Разделы')
    main.insertAdjacentHTML('beforeend', sectionsHTML)
    sections = document.getElementById('sections')
  }

  for (section of sectionList) {
    sectionHTML = createSectionHTML(section.name, section.slug)
    sections.insertAdjacentHTML('beforeend', sectionHTML)
  }


  topicsList = isRoot ? [] : sectionsJson.topics
  if (topicsList.length > 0) {
    topicsHTML = createContentListHTML('topics', 'Темы', ['Тема', 'Автор', 'Дата создания'])
    main.insertAdjacentHTML('beforeend', topicsHTML)
    topics = document.getElementById('topics')
  }

  for (topic of topicsList) {
    topicHTML = createTopicHTML(topic.name, topic.slug, topic.user, topic.created_at)
    topics.insertAdjacentHTML('beforeend', topicHTML)
  }
}

getSectionsPage()
