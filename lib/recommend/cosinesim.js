module.exports = (A,B) => {
    var dotproduct=0;
    var mA=0;
    var mB=0;
    for(i = 0; i < A.length; i++){ // here you missed the i++
        dotproduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    if(mA === 0 || mB === 0)
        return 0;
    var similarity = (dotproduct)/((mA)*(mB)) // here you needed extra brackets
    return similarity;
}