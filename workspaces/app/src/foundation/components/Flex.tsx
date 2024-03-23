import type * as CSS from "csstype";
import styled from "styled-components";

const _Flex = styled.div<{
	$align?: string;
	$direction?: string;
	$flexGrow?: CSS.Property.FlexGrow;
	$gap?: number;
	$justify?: string;
	$p?: number;
	$pb?: number;
}>`
  align-items: ${({ $align }) => $align};
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  flex-grow: ${({ $flexGrow }) => $flexGrow};
  gap: ${({ $gap = 0 }) => $gap}px;
  justify-content: ${({ $justify }) => $justify};
  padding-bottom: ${({ $pb }) => `${$pb}px`};
  padding: ${({ $p }) => `${$p}px`};
`;

type Props = {
	align: CSS.Property.AlignItems;
	as?: keyof JSX.IntrinsicElements;
	children: React.ReactNode;
	direction?: CSS.Property.FlexDirection;
	flexGrow?: CSS.Property.FlexGrow;
	gap?: number;
	justify: CSS.Property.JustifyContent;
	p?: number;
	pb?: number;
};

export const Flex: React.FC<Props> = ({
	align,
	as,
	children,
	direction,
	flexGrow,
	gap,
	justify,
	p,
	pb,
}) => {
	return (
		<_Flex
			$align={align}
			$direction={direction}
			$flexGrow={flexGrow}
			$gap={gap}
			$justify={justify}
			$p={p}
			$pb={pb}
			as={as}
		>
			{children}
		</_Flex>
	);
};
