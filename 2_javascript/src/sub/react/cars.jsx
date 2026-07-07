function MyCars(){
    const cars = ['볼보','비엠','포드'];
    return(
        <>
        <ul>
            {cars.map((car, index) =>(
 <li key={index}>{car}</li>               
            ))}
        </ul>
        </>
    )

}
export default MyCars;