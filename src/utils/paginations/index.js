exports.getPagination = (page, perPage) => {
    if (perPage == -1) return { limit: null, offset: null }
    const limit = perPage ? perPage : 10;
    const offset = page ? (page) * limit : 0;

    return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, rows, totalPages, currentPage };
};