import { IMAGE_BASE_URL } from "../utils/urls";

export const getImageUrl = (value: string | undefined) => {
    if (!value || value.trim() === '') {
        return 'https://via.placeholder.com/300?text=No+Image';
    }
    return value.startsWith('http') ? value : `${IMAGE_BASE_URL}${value}`;
};
