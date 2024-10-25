import { describe, it, expect } from 'vitest';
import { uri2curie, uri2shortUri, prefix_cc } from './curie';

describe('associateURIWithCURIE', () => {
  it('should convert a URI to a CURIE using the default context', async () => {
    const uri = 'http://www.w3.org/2004/02/skos/core#Concept';
    const curie = await uri2curie(uri, prefix_cc);
    expect(curie).toBe('skos:Concept');
  });

  it('should return the original URI if no matching prefix is found', async () => {
    const uri = 'http://example.org/unknown#Property';
    const curie = await uri2curie(uri, prefix_cc);
    expect(curie).toBe(uri);
  });
});

describe('uri2shortUri', () => {
  it('should convert a URI to a CURIE using the default context', async () => {
    const uri = 'http://www.w3.org/2004/02/skos/core#Concept';
    const curie = await uri2shortUri(uri);
    expect(curie).toBe('skos:Concept');
  });

  it('should return a shortened URI if no matching prefix is found', async () => {
    const uri = 'http://example.org/unknown#Property';
    const curie = await uri2shortUri(uri);
    expect(curie).toBe('unknown:Property');
  });

  it('should return a shortened URI splitting by / if no matching prefix is found', async () => {
    const uri = 'http://example.org/unknown/Property';
    const curie = await uri2shortUri(uri);
    expect(curie).toBe('unknown:Property');
  });

  it('should return a shortened URI splitting by # if no matching prefix is found', async () => {
    const uri = 'http://example.org/unknown#foo/bar/Property';
    const curie = await uri2shortUri(uri);
    expect(curie).toBe('unknown:foo/bar/Property');
  });
  it('should return a shortened URI splitting by # if no matching prefix is found', async () => {
    const uri = 'http://example.org/unknown#/foo/bar/Property';
    const curie = await uri2shortUri(uri);
    expect(curie).toBe('unknown:/foo/bar/Property');
  });
});
