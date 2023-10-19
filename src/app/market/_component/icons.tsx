type IconProps = React.HTMLAttributes<SVGElement>;
import { Baby, Disc3, ListMusic } from "lucide-react";

export const Icons = {
  singer: (props: IconProps) => <Baby {...props} />,
  album: (props: IconProps) => <Disc3 {...props} />,
  music: (props: IconProps) => <ListMusic {...props} />,
};
