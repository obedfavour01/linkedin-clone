import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import { postArticleAPI } from "../actions/index";

function PostModal(props) {
  const post = useSelector((state) => state.userState.user);

  const dispatch = useDispatch();
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState(" ");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  //const [bulbImage, setBulbImage] = useState([])

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image , the file is a ${typeof image}`);

      return;
    }
    if (e.target.files.length !== 0) setShareImage(image);

    console.log(shareImage);
  };

  const switchAssetsArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: post,
      description: editorText,
      timeStamp: firebase.firestore.Timestamp.now(),
    };

    dispatch(postArticleAPI(payload));
    reset(e);
  };
  const reset = (e) => {
    setEditorText("");
    setVideoLink(" ");
    setShareImage(" ");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2> Create A Post </h2>
              <button onClick={(event) => reset(event)}>
                <img src="./images/close.png" alt="" />
              </button>
            </Header>

            <SharedContent>
              <UserInfo>
                {post.photoURL ? (
                  <img src={post.photoURL} alt="" />
                ) : (
                  <img src="./images/user.svg" alt="" />
                )}

                <span>{post.displayName}</span>
              </UserInfo>

              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="Whats on your mind?"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif,image/jpeg,image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an Image to share</label>
                    </p>

                    {shareImage && (
                      <img
                        src={URL.createObjectURL(
                          new Blob([shareImage], { type: "image" })
                        )}
                        alt=""
                      />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        placeholder="please input a video link "
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer
                          width={"100%"}
                          url={videoLink}
                          origin="http://localhost:3000"
                        />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>

            <SharedCreation>
              <AttachAssets>
                <AssetsButton onClick={() => switchAssetsArea("image")}>
                  <img src="./images/file-image.svg" alt="selectedImage" />
                </AssetsButton>
                <AssetsButton onClick={() => switchAssetsArea("media")}>
                  <img src="./images/file-video.svg" alt="video" />
                </AssetsButton>
              </AttachAssets>

              <SharedComments>
                <AssetsButton>
                  <img src="./images/comment.png" alt="" />
                  Anyone
                </AssetsButton>
              </SharedComments>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 10px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn o.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: block;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    height: 40px;
    width: 40px;
    color: rgba(0, 0, 0, 0.15);

    img {
      width: 50%;
      opacity: 0.7;
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-clip: content-box;
    border: 2px solid transparent;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetsButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetsButton} {
    width: 40px;
  }
`;

const SharedComments = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);

  ${AssetsButton} {
    img {
      margin-right: 5px;
      width: 20px;
    }
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.5)" : "#0a56c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.06)" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
