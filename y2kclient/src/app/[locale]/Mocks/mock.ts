interface CarouselItem {
    name: string;
    id: number;
    img: string;
}

const mockCarousel: CarouselItem[] = [
    {
        name: 'Promotion1',
        id: 1,
        img: 'https://res.cloudinary.com/dljgbq48k/image/upload/v1710340463/preview-page0_g3hg1o.jpg'
    },
    {
        name: 'Promotion2',
        id: 2,
        img: 'https://res.cloudinary.com/dljgbq48k/image/upload/v1710340462/images_ogyn2u.jpg'
    },
    {
        name: 'Promotion3',
        id: 3,
        img: 'https://res.cloudinary.com/dljgbq48k/image/upload/v1710340462/images_1_znsett.jpg'
    }
];

export default mockCarousel;