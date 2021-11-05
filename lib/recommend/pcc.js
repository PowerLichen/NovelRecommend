module.exports = (data, uid, target_id) => {
    var sumX = 0;
    var sumY = 0;
    var sumPowX = 0;
    var sumPowY = 0;
    var sumXY = 0;
    var count = 0;

    for (var nid in data[uid]) {
        if (nid in data[target_id]) {
            sumX += data[uid][nid]
            sumY += data[target_id][nid]
            sumPowX += Math.pow(data[uid][nid], 2);
            sumPowY += Math.pow(data[target_id][nid], 2);
            sumXY += data[uid][nid]*data[target_id][nid];
            count += 1;
        }
    }

    return (sumXY - ((sumX*sumY)/count)) / Math.sqrt((sumPowX - (Math.pow(sumX,2)/count))*(sumPowY - (Math.pow(sumY,2)/count)));
}