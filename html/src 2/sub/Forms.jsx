const Forms = () =>{
    return(
        <>
<div className="container-fluid">
    <div className="row">
        <div className="col-md-12">
            <h1 className="mt-70">
                html<small className="text-secondary">-Forms</small>
            </h1>
        </div>        
    </div>

    <div className="row">
        <div className="col-md-4">
<form action="">
<label htmlFor="" className="form-label">first name</label>
<br/>
<input type="text" name="" id="" placeholder="이름을 적어주세요"
className="form-control"
/>
<br/>
<label htmlFor="" className="form-label">lastname</label>
<br/>
<input type="text" name="" id="" placeholder="성을 적어주세요"
className="form-control"
/>
<br/>
<div className="d-flex justify-content-end">
<input type="submit" value="submit" 
className="btn btn-outline-success btn-lg"/>
</div>

</form>            
        </div>
        <div className="col-md-4">
<p>성별체크</p>
<input type="checkbox"/><label htmlFor="">남</label><br/>
<input type="checkbox"/><label htmlFor="">녀</label><br/>  
<input type="radio"/><label htmlFor="">기타</label><br/>
        </div>
        <div className="col-md-4">
<p>사용하는이메일</p> 
<input type="text" placeholder="메일아이디를적어주세요"/>
@
<select>
    <option>gmail.com</option>
    <option>naver.com</option>
    <option>daum.net</option>

</select>

        </div>
    </div>

    <div className="row">
        <div className="col-md-4">
            <p>패스워드</p>
            <input type="password" placeholder="패스워드를 입력하세요"/>
            <input type="password" placeholder="패스워드를 다시 입력하세요"/>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
    </div>

    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
    </div>

    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
    </div>
</div>
        </>
    )
}
export default Forms;