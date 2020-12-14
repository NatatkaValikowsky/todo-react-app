const getId = (item) => {
    return item.title + item.date.getTime();
};

export default getId;
