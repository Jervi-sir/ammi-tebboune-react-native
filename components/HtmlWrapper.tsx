import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

const renderersProps = {
  ol: {
    enableExperimentalRtl: true,
  },
  ul: {
    enableExperimentalRtl: true,
  },
};

export const HtmlWrapper = ({ content = '' }) => {
  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: content }}
      renderersProps={renderersProps}
      tagsStyles={HtmlStyle}
    />
  );
};

const HtmlStyle = {
  h1: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 24,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  h2: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  h3: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  h4: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  h5: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  h6: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    direction: 'rtl',
  },
  p: {
    padding: 0,
    margin: 0,
    marginBottom: 2,
    textAlign: 'right',
    fontSize: 16,
    direction: 'rtl',
  },
  a: {
    color: '#1D4ED8',
    textDecorationLine: 'underline',
    marginBottom: 2,
    direction: 'rtl',
  },
  ul: {
    paddingRight: 10,
    marginBottom: 2,
    textAlign: 'right',
    direction: 'rtl',
  },
  ol: {
    paddingRight: 10,
    marginBottom: 2,
    textAlign: 'right',
    direction: 'rtl',
  },
  li: {
    marginBottom: 2,
    textAlign: 'right',
    direction: 'rtl',
  },
  strong: {
    fontWeight: 'bold',
    textAlign: 'right',
    direction: 'rtl',
  },
  em: {
    fontStyle: 'italic',
    textAlign: 'right',
    direction: 'rtl',
  },
  blockquote: {
    borderRightWidth: 4,
    borderRightColor: '#9CA3AF',
    paddingRight: 16,
    marginBottom: 2,
    fontStyle: 'italic',
    textAlign: 'right',
    direction: 'rtl',
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 4,
    textAlign: 'right',
    direction: 'rtl',
  },
  pre: {
    fontFamily: 'monospace',
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 4,
    marginBottom: 2,
    textAlign: 'right',
    direction: 'rtl',
  },
  img: {
    width: '100%',
    height: 'auto',
    marginBottom: 2,
    borderRadius: 10,
    overflow: 'hidden',
    direction: 'rtl',
  },
};

