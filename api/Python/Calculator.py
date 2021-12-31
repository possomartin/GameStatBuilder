#Libraries
import numpy as num
import json
import requests as req
from itertools import groupby
import random
import sys

#functions

#to sort items in list
def manual_func(data):
  lookup = {}
  result = []

  for element in data:
    if element[2] not in lookup:
      target = lookup[element[2]] = [element]
      result.append(target)
    else:
      lookup[element[2]].append(element)
  return result

#make random choice within list
def MakeRandomChoice(list):
  randomChoices = []

  for element in manual_func(list):
    randomChoices.append(random.choice(element))

  return randomChoices
  
#calculate best option from list of itmes
def GetBest(list, selectedOption):
  bestOptions = []
  for item in list:
    for i in item:
      if i[1] == selectedOption and item not in bestOptions:
        bestOptions.append(item)
  
  sum = 0
  mayor = 0
  bestOption = []

  for option in bestOptions:
    sum = 0
    for o in option:
      sum += o[0]
    
    if (sum > mayor):
      mayor = sum
      bestOption = option
    #print("Suma")
    #print(sum, option)
  #print("Mejor Opcion")
  #print('{"total":', mayor, ', "BestOption:', bestOption, '}')
  print(json.dumps({"total": mayor, "BestOption": bestOption}))
  #print(mayor, bestOption)

#core

def Core(Game, ItemName):
  #URLs
  baseUrl = "http://localhost:3000/"

  #database URLs
  categoriesUrl = "categories/all"
  boostsUrl = "boosts/all"
  itemsUrl = "items/all"
  statsUrl = "stats/all"
  gamesUrl = "games/all"

  try:

    #boots request
    boosts = req.get(baseUrl + boostsUrl)
    boostList = json.loads(boosts.text)

    #items request
    items = req.get(baseUrl + itemsUrl)
    itemList = json.loads(items.text)

    #stats request
    stats = req.get(baseUrl + statsUrl)
    statsList = json.loads(stats.text)

    #categories request
    categories = req.get(baseUrl + categoriesUrl)
    categoriesList  = json.loads(categories.text)

    #games request
    games = req.get(baseUrl + gamesUrl)
    gamesList = json.loads(games.text)
      
    GameStats = []

    for i in range(len(boostList)):
      for j in range(len(itemList)):
        if (boostList[i]['_itemID'] == itemList[j]['_id']):
          for k in range(len(statsList)):
            if (boostList[i]['_statID'] == statsList[k]['_id']):
              for l in range(len(categoriesList)):
                if (itemList[j]['_categoryID'] == categoriesList[l]['_id']):
                  for m in range(len(gamesList)):
                    if (itemList[j]['_gameID'] == gamesList[m]['_id']):
                      GameStats.append([boostList[i]['value'], itemList[j]['name'], statsList[k]['name'], categoriesList[l]['name'], gamesList[m]['name'], itemList[j]['_id']])
    
    #print("Games within a game")

    ItemsInGame = []

    for i in range(len(GameStats)):
      if Game in GameStats[i]:
        ItemsInGame.append(GameStats[i])
        #print([i], GameStats[i])

    eachItem = []

    for i in range(len(ItemsInGame)):
      if ItemsInGame[i][1] not in eachItem:
        eachItem.append(ItemsInGame[i][1])
    
    sum = 0
    SumList = []

    for i in eachItem:
      sum = 0
      categoryName = ''
      for j in ItemsInGame:
        if i in j:
          sum += j[0]
          categoryName= j[3]
      SumList.append([sum, i, categoryName])
    #print("Sum Total List")
    #print(SumList)

    #print("Ordered List")
    #print(manual_func(SumList))


    allChoices = []

    for i in range(10000):
      allChoices.append(MakeRandomChoice(SumList))
    #print("All Choices")
    #for i in range(len(allChoices)):
      #print([i], allChoices[i])
    
    #print("Best Option")
    GetBest(allChoices, ItemName)
    sys.stdout.flush()

  except req.exceptions.ConnectionError:
    print("Connection Refused")
  
Core(str(sys.argv[1]), str(sys.argv[2]))