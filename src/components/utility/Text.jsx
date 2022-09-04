const Text = ({ text }) => {
  // eslint-disable-next-line no-useless-escape
  const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;

  return (
    <>
      {regexp_url.test(text) ? (
        <div
          dangerouslySetInnerHTML={{
            __html: text.replace(
              regexp_url,
              '<a href="$1" target="_blank">$1</a>'
            ),
          }}
        ></div>
      ) : (
        <div>{text}</div>
      )}
    </>
  );
};

export default Text;
