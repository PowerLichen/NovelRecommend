import React,{useState} from 'react'
import styled, { createGlobalStyle } from "styled-components";
import { USER_SERVER } from '../../../components/Config.js';
import axios from "axios";

function SearchPage(props) {

    const [Word, setWord] = useState("");
    const [Posts, setPosts] = useState([]);
    const [Pages, setPages] = useState([1]);
    const [Notice, setNotice] = useState(false);

    const [SearchItems, setSearchItems] = useState("title");

    //검색어 이벤트
    const onWordHandler=(event)=>{
      setWord(event.currentTarget.value)
      setPages([1]);
      setNotice(false);
    }

    //검색 버튼 이벤트
    const onSubmitHandler = (event) =>{
     
      event.preventDefault();
      axios
        .get(`${USER_SERVER}/search/${SearchItems}/${Word}/0`) 
        .then(({ data }) => { setPosts(data); console.log(data);});

      setNotice(true);
    }

    //검색 항목 체크박스 이벤트
    const handleChangeCheck = e =>{
      setSearchItems(e.target.value)
    }

    //소설 포스트 페이지 갱신
    const fetchNovel = () => {
        setPages(Number(Pages)+1);
        fetch(`${USER_SERVER}/search/${SearchItems}/${Word}/${Pages}`)
              .then(response => response.json())
              .then(response => {
                  console.log(response)
                  setPosts([...Posts, ...response])  
        })
    }

    //검색 알림
    function notice() {
      if (Notice === true) {
        return (
          <div>
            <Notices>
              "{Word}"에 대한 검색 결과입니다.
            </Notices>
          </div>
        )
      }
      else {

      }
    }

    return (
      <div>
        <Search>
          <form className="form" onSubmit={onSubmitHandler} >
            <select className="check" onChange={handleChangeCheck}>
              <option value="title">제목</option>
              <option value="name">작가</option>
              <option value="description">줄거리</option>
              <option value="tag">태그</option>
            </select>
            <div className="div1"></div>

            <div className="searchForm">
              <input type="text" className="searchInput" value={Word} onChange={onWordHandler}></input>
            </div>
            <div className="div1"></div>
            <button type='submit' className="searchButton">
              검색
            </button>
          </form>
        </Search>
        {
          notice()
        }
        <Container>
          <GlobalStyle />
          {Posts.map((data, index) => (
            <Post key={index}>
              <a href={`/novel/${data.id}`}>
                <Body>
                  {/* 작품 표지 이미지 url */}
                  <Img>
                    <img src={`${data.imgurl}`} width='200' height='280' align='center' ></img>
                  </Img>
                  <Effcet />
                </Body>
                {/* 작품 타이틀*/}
                <Title>{data.title}</Title>
              </a>
            </Post>
          ))}
        </Container>
        {/*Load More 방식 - 페이지 갱신*/}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={fetchNovel}> Load More</button>
        </div>
      </div>
    )
}

//스타일 영역
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 50px 0;
  display: grid;
  grid-template-columns: repeat(5, 200px);
  grid-gap: 20px 50px;
  justify-content: center;
  box-sizing: border-box;
`;

const Post = styled.div`
  a:link { color: black; font-weight: bold;}
  a:visited { color: purple; font-weight: bold;}
  a:hover { color: #f4ac19; font-weight: bold;}
  position: relative;
`;
const Img = styled.div`
  border: 1px solid black;
`;

const Title = styled.div`
  padding: 0px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  padding: 2px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Effcet = styled.div`
  border: 2px solid black;
  height: 270px;
  position: relative;
`;

const Search = styled.div`
  .searchInput {
    font-size: 20px;
    border:none;
    width: 380px;
  }
  .searchButton {
    background-color #f4ac19;
    border: 10px solid #f4ac19;
    color: White;
    border-radius: 2px;
  }
  .div1{
    width: 10px;
  }
  .form{
    display: flex;
    justify-content: center;
  } 
  .searchForm{
    border: 8px solid #f4ac19;
    width: 400px;
    height: 50px;
    border-radius: 2px;
  }
  .check {
    border: 4px solid #f4ac19;
    border-radius: 2px;
    color: #f4ac19;
  }
`;

const Notices = styled.span`
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

`;
export default SearchPage
