import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";
import PostModal from "./PostModal";
import { useSelector, useDispatch } from "react-redux";
import { getArticleAPI } from "../actions/index";
import ReactPlayer from "react-player";

const Main = () => {
  const imago = useSelector((state) => state.articleState);
  const dei = useSelector((state) => state.userState.user);
  const casa = useSelector((state) => state.articleState.articles);
  const [showModal, setShowModal] = useState("close");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleAPI());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      {casa.length === 0 ? (
        <p> There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {dei && dei.photoURL ? (
                <img src={dei.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <button
                onClick={handleClick}
                disabled={imago.loading ? true : false}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/photo-icon.svg" alt="" />
                <span>Photo</span>
              </button>

              <button>
                <img src="/images/video-icon.svg" alt="" />
                <span>Videos</span>
              </button>

              <button>
                <img src="/images/event-icon.svg" alt="" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article-icon.svg" alt="" />
                <span>write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {imago.loading && <img src="./images/oval.svg" alt="" />}

            {casa.length > 0 &&
              casa.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} alt="" />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>

                    <button>
                      <img src="./images/ellipsis.svg" alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {article.sharedmg && article.video ? (
                        <ReactPlayer width={"100%"} url={article.video} />
                      ) : (
                        article.sharedImg && <img src={article.sharedImg} />
                      )}
                    </a>
                  </SharedImg>

                  <SocialCounts>
                    <li>
                      <button>
                        <img src="./images/like.png" alt="like" />
                        <img src="images/clap.png" alt="clap" />

                        <span>75</span>
                      </button>
                    </li>

                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCounts>

                  <SocialActions>
                    <button>
                      <img src="./images/like.png" alt="likeicon" />
                    </button>

                    <button>
                      <img src="./images/comment.png" alt="comment-icon" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="./images/share.png" alt="shareicon" />
                      <span>shares</span>
                    </button>
                    <button>
                      <img src="./images/send.png" alt="sendicon" />
                      <span>send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  grid-area: "main";
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgb(0, 0, 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 10px;
      line-height: 1.5;
      min-height: 48px;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      background: transparent;
    }
    &:first-child {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px 12px 0 16px;

      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 6px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          width: 48px;
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }

      }
 

      @media (max-width:552px){
            display: none;
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 15px 0;
  margin-bottom: 6px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #91afce;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  overflow: auto;
  align-items: flex-start;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;

  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;

      img {
        width: 20px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #9a66c2;
    font-size: 10px;
    border: none;
    background-color: white;
    width: 50px; 

    img {
      width: 50%;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Main;
