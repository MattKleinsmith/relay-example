import * as React from "react";
import Image from "./Image";
import { graphql } from 'relay-runtime';
import { useFragment, useQueryLoader } from "react-relay";
import type { PosterBylineFragment$key } from './__generated__/PosterBylineFragment.graphql';
import Hovercard from './Hovercard';
import PosterDetailsHovercardContents from './PosterDetailsHovercardContents';
import { PosterDetailsHovercardContentsQuery } from './PosterDetailsHovercardContents';
import type { PosterDetailsHovercardContentsQuery as HovercardQueryType } from './__generated__/PosterDetailsHovercardContentsQuery.graphql';
const { useRef } = React;

const PosterBylineFragment = graphql`
  fragment PosterBylineFragment on Actor {
    id
    name
    profilePicture {
      ...ImageFragment
    }
  }
`;

export type Props = {
  poster: PosterBylineFragment$key
};

export default function PosterByline({ poster }: Props): React.ReactElement {
  const data = useFragment(PosterBylineFragment, poster);
  const hoverRef = useRef(null);
  const [
    hovercardQueryRef,
    loadHovercardQuery,
  ] = useQueryLoader<HovercardQueryType>(PosterDetailsHovercardContentsQuery);
  function onBeginHover() {
    loadHovercardQuery({ posterID: data.id });
  }
  return (
    <div
      ref={hoverRef}
      className="byline">
      <Image image={data.profilePicture} width={60} height={60} className="byline__image" />
      <div className="byline__name">{data.name}</div>
      <Hovercard targetRef={hoverRef}
        onBeginHover={onBeginHover}>
        <PosterDetailsHovercardContents posterID={data.id} queryRef={hovercardQueryRef} />
      </Hovercard>
    </div>
  );
}
