import { Helmet } from "react-helmet-async";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="descrition" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Proshop",
  description: "We sell the best product in cheap",
  Keyword: "electronics, buy electronics, cheap electronics",
};

export default Meta;
