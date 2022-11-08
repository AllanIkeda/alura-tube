import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const estiloDaHomePage = {
    // backgroundColor: "red"
  };
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
      <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <TimeLine searchValue={valorDoFiltro} playlists={config.playlists} />
      </div>
    </>
  );
}

export default HomePage

// const Menu = () => {
//   return (
//     <div>
//       Menu
//     </div>
//   )
// };

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
      /* margin-top: 50px; */
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>

          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

const TimeLine = ({searchValue, ...param}) => {
  const playlistsNames = Object.keys(param.playlists);

  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = param.playlists[playlistName];
        console.log(playlistName);
        console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) =>{
                const titleNrmalized = video.title.toLowerCase();
                const searchValueNrmalized = searchValue.toLowerCase();
                return titleNrmalized.includes(searchValueNrmalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}