import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/components/App';
import { extractCritical } from 'emotion-server';
import serialize from 'serialize-javascript';

module.exports = function () {

  const { html, ids, css } = extractCritical(renderToString( < App /> ));
  const viewData = `window.__data=${serialize({ids})};`;
  return  (
	<html>
		<head>
			<meta charSet='utf-8' />
			<title>Node School App</title>
			<link rel='shortcut icon' href='/public/favicon.ico' />
			<link rel='stylesheet' href='style.css' />
			<style type='text/css' dangerouslySetInnerHTML={{__html: css}}></style>
		</head>
		<body>
			<div id='root' dangerouslySetInnerHTML={{__html: html}}></div>
			<script dangerouslySetInnerHTML={{__html: viewData}}></script>
			<script src='bundle.js'></script>
		</body>
	</html>);

};
