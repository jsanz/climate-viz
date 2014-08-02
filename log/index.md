---
layout: page
title: Log
header: Posts on the log
group: navigation
---
{% include JB/setup %}

{% for post in site.posts %}

  <h2><a href="{{ post.url }}" class="dark-link">{{ post.title | truncatewords:}}</a></h2>

  <p>{{ post.content | strip_html | truncatewords: 50 }}</p>
  <p class="pull-right post_listing_date">Posted on {{ post.date | date: "%A, %d/%m/%y at %H:%M" }}
      {% if post.tags %} in
        {% for tag in post.tags %}
        <a href="/tags.html#{{ tag | slugize }}-ref">{{ tag }}</a>
        {% unless forloop.last %}, {% endunless %}
        {% endfor %}
      {% endif %}</p>
  <p class="pull-left"> <a href="{{ post.url }}">Read more</a></p>
  <div style="clear:both;min-height:15px;"></div>

{% endfor %}