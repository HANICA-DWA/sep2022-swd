# Answers Preparation 5

## One-to-one relation

Natural choice is to embed the resume in the employee. Unless you almost never need to access the resume, when accessing the employee (and the resume is rather large).
~~If one document grows faster than the other, or if one document might become larger than 16 megs (of you film your resume in 4k for example), than linking might be better.~~

## One-to-many relation

Possibilities:

1. _Location embeds information about each person_
   Problem: might become too large, if there are many characters. But if there are only a few characters, this might be a good design.

1. _Location links to a character_
   (same thing) document might become too large, if there are many characters.

1. _Embed the location in each character_
   Might open you up to inconsistencies because location information is duplicated.

1. _Add attribute to character that links to a location_
   Manage your foreign keys.

## Many-to-many relation

Possibilities:

1. _Linking both collections by arrays_
   Drawback: inconsistent foreign keys.

1. _Linking only one_
   Drawback: searching the other way might get very expensive.

1. _Embedding Semesters in students_
   Drawback: inconsistent data, if a semester changes.

1. _Embedding students in semester_
   Drawback: might grow too large, inconsistent data.

## Aspects you should consider

- Access patterns
- Frequency of changes
- Expected total size of a document
- Atomicity (as few collections as possible)
