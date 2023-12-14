const images = [
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
		description: 'Hokkaido Flower',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
		description: 'Container Haulage Freight',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
		description: 'Aerial Beach View',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
		description: 'Flower Blooms',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
		description: 'Alpine Mountains',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
		description: 'Mountain Lake Sailing',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
		description: 'Alpine Spring Meadows',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
		description: 'Nature Landscape',
	},
	{
		preview:
			'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
		original:
			'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
		description: 'Lighthouse Coast Sea',
	},
]

const galleryContainer = document.querySelector('.gallery')

// Створюємо один екземпляр модального вікна за межами циклу
const modal = basicLightbox.create('', {
	onShow: () => {
		document.addEventListener('keydown', handleKeyPress)
		document.addEventListener('click', handleClickOutside)
	},
	onClose: () => {
		document.removeEventListener('keydown', handleKeyPress)
		document.removeEventListener('click', handleClickOutside)
	},
})

images.forEach(({ preview, original, description }) => {
	const galleryItem = document.createElement('li')
	galleryItem.classList.add('gallery-item')

	const galleryLink = document.createElement('a')
	galleryLink.classList.add('gallery-link')
	galleryLink.href = original

	const galleryImage = document.createElement('img')
	galleryImage.classList.add('gallery-image')
	galleryImage.src = preview
	galleryImage.alt = description
	galleryImage.dataset.source = original

	galleryLink.appendChild(galleryImage)
	galleryItem.appendChild(galleryLink)
	galleryContainer.appendChild(galleryItem)
})

// Додаємо слухач подій тільки один раз за межами циклу
galleryContainer.addEventListener('click', handleGalleryClick)

function handleGalleryClick(event) {
	event.preventDefault()
	const target = event.target
	if (target.nodeName === 'IMG') {
		const largeImageSrc = target.dataset.source
		console.log('Посилання на велике зображення:', largeImageSrc)

		// Оновлюємо контент модального вікна
		modal.setContent(`<img width="1400" height="900" src="${largeImageSrc}">`)

		// Показуємо модальне вікно
		modal.show()
	}
}

function handleKeyPress(event) {
	if (event.key === 'Escape') {
		modal.close()
	}
}

function handleClickOutside(event) {
	const isClickInsideImage = event.target.closest('.basicLightbox')
	if (!isClickInsideImage) {
		modal.close()
	}
}
