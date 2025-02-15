import axios from 'axios';

export function choosePhotos() {
	const input = document.createElement('input');
	input.type = 'file';
	input.multiple = true;
	input.accept = 'image/jpeg, image/png';
	input.onchange = (event: any) => {
		const files = (event.target as HTMLInputElement).files;
		if (files) {
			const validFiles = Array.from(files).filter((file: File) =>
				['image/jpeg', 'image/png'].includes(file.type)
			);
			if (validFiles.length > 0) {
				uploadPhotos(validFiles);
			} else {
				alert('Please upload only jpg, jpeg, or png files.');
			}
		}
	}
	input.click();
}

async function uploadPhotos(files: File[]) {
	const formData = new FormData();
	files.forEach(file => formData.append('photos', file));

	try {
		const response = await axios.post('/api/uploadPhotos', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		console.log('Photos uploaded successfully');
	} catch (error) {
		console.error('Failed to upload photos', error);
	}
}