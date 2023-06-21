# ReTurn

## Description
ReTurn is a simple WebApp for parsing interlocutors of corpus data into `xml` tags.
Other data in the corpus file(s) will stay unchanged.

This App is specifically tailored towards the [Santa Barbara Corpus of Spoken American English](https://www.linguistics.ucsb.edu/research/santa-barbara-corpus).  

### How to use it
+ add the names of the interlocutors
+ upload the corpus file
  + the `dialogue` tag is mandatory!
  + the speaker has to be at the start of a line!
+ click the parse button and check the changes
+ download the parsed file

### Example
```xml
<dialogue id="1" corpus="test" lang="en">
Adrian: Hi<punc type="comma" /> my name is Adrian<punc type="stop" />
George: Well hello there<punc type="comma" /> Adrian<punc type="stop" />
</dialogue>
```
```xml
<dialogue id="1" corpus="test" lang="en">
<turn n="1" speaker="Adrian">
  Hi<punc type="comma" /> my name is Adrian<punc type="stop" />
</turn>
<turn n="2" speaker="George">
  Well hello there<punc type="comma" /> Adrian<punc type="stop" />
</turn>
</dialogue>
```
