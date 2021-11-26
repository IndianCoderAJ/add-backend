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

exports.getFilter = (filter) => {
if(filter.length <= 0) return {}
let finalFilter = {}
if(!filter[0].value) return finalFilter;
finalFilter[`${filter[0].columnField}`] = '';
    switch(filter[0].operatorValue){
        case 'contains':
            finalFilter[`${filter[0].columnField}`] = { "$regex": filter[0].value, "$options": "i" }
            break
        case 'equals':
            finalFilter[`${filter[0].columnField}`] = value;
            break     
        case 'startsWith':
            finalFilter[`${filter[0].columnField}`] = `/^${value}/`;
            break 
        case 'endsWith':
            finalFilter[`${filter[0].columnField}`] = { "$regex": filter[0].value, "$options": "i" }
            break  
        default:    
        finalFilter = {}
    }
return finalFilter;
}