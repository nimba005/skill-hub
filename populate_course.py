#!/usr/bin/env python3
from uuid import uuid4
from dotenv import load_dotenv
from os import getenv
import time
from requests import get
from backend import db
from backend.storage.tables.course import Course
from backend.storage.tables.video import Video

load_dotenv()
query = input("Query=> ")
description = input("Description=> ")
popular = int(input("Popular (1/0)=> "))

if len(description) >= 1000:
  description = description[:996] + "..."
if popular not in [0, 1]:
  print("Wrong popular choice, retry again")
  exit()

endpoint = "https://api.vimeo.com/videos"
key = getenv("API_KEY")

headers = {
  "Authorized": f"Bearer {key}",
  "Content-Type": "application/json"
}
params = {
  "query": query
}
response = get(endpoint, headers=headers, params=params)
res = response.json()
paging = res["paging"]
response_data = res["data"]

new_course = Course(
  title=query,
  image_url=response_data[0]['pictures']['sizes'][-1]['link'],
  description=description,
  id=str(uuid4()),
  is_popular=True if popular == 1 else False
)
res = db.add(new_course)
print(res)
print("Course added, adding videos...")
time.sleep(2)
print()

# Extracting information for the first video
count = 1
page = 2
added = 0
for video in response_data:
  issue = "N";
  privacy = video['privacy']
  view = privacy.get("view")
  embed = privacy.get("embed")

  if view != "anybody" or embed != "public":
    issue = "p"
  # Extracting details
  title = video['name']
  html_embed_code = video['embed']['html']

  if len(title) >= 200:
    title = title[:186] + "..."
  if not html_embed_code or len(html_embed_code) > 999:
    issue = "L"
  if issue == "P":
    print("Privacy Issue")
  elif issue == "L":
    print("Embed link issue")
  elif issue == "N":
    new_video = Video(
      title=title,
      id=str(uuid4()),
      course_id=new_course.id,
      embed_link=html_embed_code
    )
    new_video.course = db.get_row(Course, new_course.id)
    res = db.add(new_video)
    print(res)
    print(f"{title} Video Added")
    added += 1
print(f"Count: {count}")
print()

if (count >= len(response_data)):
  print("Page completed")
  if paging:
    print(f"{added} videos added so far")
    print("Another Page available. Proceed?")
  while True:
    des = input("Continue? (Y/N): ")
    if des.lower() == "n":
      break
    if des.lower() not in ["n", "y"]:
      print("Wrong input, Exiting anyway")
      break
    params = {
      "query": query,
      "page": page
    }
    response = get(endpoint, headers=headers, params=params)
    res = response.json()
    page += 1
    print(paging)
    paging = res["paging"]
    paging = paging.get("next")
    response_data.extend(res["data"])
    print()

  count += 1
  time.sleep(1)
print()
print(f"Total videos: {count - 1}")
print(f"Added: {added}")