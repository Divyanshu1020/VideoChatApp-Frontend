import { Helmet } from "react-helmet-async";
export default function Title({
  title = "Video Chat App",
  description = "This is a Video Chat App",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
